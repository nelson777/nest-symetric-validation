import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbRepo } from 'src/dataObjects/dbRepo';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';


const jwtFactory = {
	useFactory: async (configService: ConfigService) => {
		let privateKey = configService.get<string>('JWT_PRIVATE_KEY_BASE64', '');
		let publicKey = configService.get<string>('JWT_PUBLIC_KEY_BASE64', '');
		//		let privateKey = configService.get<string>('JWT_SECRET', '');

		return {
			privateKey,
			publicKey,
			signOptions: {
				expiresIn: configService.get('JWT_EXP_H'),
			},
		};
	},
	inject: [ConfigService],
};

@Module({
	imports: [
		JwtModule.registerAsync(jwtFactory),
		PassportModule.register({ defaultStrategy: 'jwt' }),
	],
	controllers: [AuthController],
	providers: [AuthService, DbRepo, JwtStrategy, ConfigService],
	exports: [DbRepo, JwtModule, JwtStrategy, PassportModule],
})
export class AuthModule { }
