import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { MyContext } from "../types";
import { User } from "../entities/User";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const { username, password } = options;

    if (username.length <= 3) {
      return {
        errors: [{
          field: 'username',
          message: 'Length must be greater than 3'
        }]
      }
    }

    if (password.length <= 6) {
      return {
        errors: [{
          field: 'password',
          message: 'Length must be greater than 6'
        }]
      }
    }

    const hashedPassword = await argon2.hash(password);

    const user = em.create(User, { username, password: hashedPassword });

    try {
      await em.persistAndFlush(user);
    } catch (err) {
     if (err.code === "23505" || err.detail.includes("already exists")) {
       return {
         errors: [{
           field: 'username',
           message: 'Username taken.'
         }]
       }
     }
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const { username, password } = options;

    const user = await em.findOne(User, { username });

    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "Username doesn't exist.",
          },
        ],
      };
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return {
        errors: [
          {
            field: "password",
            message: "Invalid username or password."
          }
        ]
      }
    }


    
    return {
      user
    };
  }
}
