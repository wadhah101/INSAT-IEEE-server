/* eslint-disable @typescript-eslint/no-empty-function */
import { MemberService } from './../member/member.service';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class RunnerService implements OnApplicationBootstrap {
  constructor(private readonly memberService: MemberService) {}
  async onApplicationBootstrap() {}
}
