import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: false })
  bio: string;

  @ApiProperty({ required: false })
  image: string;

  @ApiProperty({ required: true, default: 'USER' })
  role: string;

  @ApiProperty({ required: true, default: 'FREE' })
  tarif: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

enum Role {
  USER,
  ADMIN,
}

enum Tarif {
  FREE,
  STANDART,
  ADVANCED,
}
