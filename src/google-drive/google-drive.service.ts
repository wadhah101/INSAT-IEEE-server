import { Member } from '@prisma/client';
import { MemberService } from './../member/member.service';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as axios from 'axios';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as readline from 'readline';
import { f } from './getToken';

const token = '';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

interface ImageIdWithId {
  member: Member;
  imageId?: string;
}

@Injectable()
export class GoogleDriveService implements OnApplicationBootstrap {
  constructor(private readonly memberService: MemberService) {}

  async getImageIdWithIds(members: Member[]): Promise<ImageIdWithId[]> {
    const pattern = /id=(.*)/;
    //   TODO make more rigid
    const imageIdWithIds = members.map((e) => ({
      imageId: e.imageUrl ? e.imageUrl.match(pattern)[1] : null,
      member: e,
    }));
    return imageIdWithIds;
  }

  async getImageUrls(
    members: Member[],
  ): Promise<{ imageUrl: string; member: Member }[]> {
    const rawData = await this.getImageIdWithIds(members);

    const data = rawData.filter((e) => !!e.imageId);

    const axiosInstance = axios.default.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const reqs = data.map(async (e) => ({
      meta: await axiosInstance.get<{ downloadUrl: string }>(
        `https://www.googleapis.com/drive/v2/files/${e.imageId}`,
      ),
      member: e.member,
    }));

    const responses = await Promise.all(reqs);

    const final = responses.map((e) => ({
      imageUrl: e.meta.data.downloadUrl,
      member: e.member,
    }));

    return final;
  }

  async onApplicationBootstrap() {
    console.log('gdrive init');
  }
}
