import { IsString } from 'class-validator';

// Used for communication purposes only - must have the same properties as
// values of the usernameField and passwordField in the LocalStrategy class
export class LoginDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}
