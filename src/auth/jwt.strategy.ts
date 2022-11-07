import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserJwtPayload } from 'src/dataObjects/user-jwt-payload.interface';
import { User } from 'src/dataObjects/user.entity';
import { DbRepo } from 'src/dataObjects/dbRepo';
import { readFile } from 'node:fs/promises';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private dbRepo: DbRepo,
		private configService: ConfigService,
	) {
		let privateKey = await readFile(__dirname + '/../config/private.ec.key');

		super({
			secretOrKey: configService.get('JWT_SECRET'),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload: UserJwtPayload): Promise<User> {
		console.log('payload', payload);
		let publicKey = await readFile(__dirname + '/../config/public.pem');
		
		const { username, typeid } = payload;
		const users: User[] = await this.dbRepo.getUsers({ username });
		const user: User = users[0];

		if (typeid > 2 || Object.keys(user).length <= 0) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
