import { HttpException, HttpStatus } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as readline from 'readline';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';

// callback : call function with token injected
export function authorizeCallback(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token.toString()));
    callback(oAuth2Client);
  });
}

export async function asyncAuthorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  // todo catch with ayncGetAccessToken
  const token = await fs.promises.readFile(TOKEN_PATH).catch(() => {
    getAccessToken(oAuth2Client, () => '');
  });

  if (!token) return;
  oAuth2Client.setCredentials(JSON.parse(token.toString()));
  return oAuth2Client;
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

export async function downloadFiles(auth, fileId: string) {
  const drive = google.drive({ version: 'v3', auth });
  const downloadReq = drive.files
    .get(
      {
        fileId,
        alt: 'media',
      },
      { responseType: 'stream' },
    )
    .catch((e) => {
      throw new HttpException(e, HttpStatus.UNPROCESSABLE_ENTITY);
    });

  return downloadReq.then(async (e) => ({ fileId, data: await e.data }));
}

async function listFiles(auth) {
  const drive = google.drive({ version: 'v3', auth });

  drive.files.list(
    {
      pageSize: 10,
      fields: 'nextPageToken, files(*)',
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;
      if (files.length) {
        console.log('Files:');
        files.map((file) => {
          console.log(file);
        });
      } else {
        console.log('No files found.');
      }
    },
  );
}

export async function f() {
  const credentielsRaw = await fs.promises
    .readFile('credentials.json')
    .catch((e) => console.log('Error loading client secret file:', e));

  if (!credentielsRaw) return;
  const credentiels = JSON.parse(credentielsRaw.toString());
  const authToken = await asyncAuthorize(credentiels);
  listFiles(authToken);
  console.log(authToken);
}

export async function fullAuth() {
  const credentielsRaw = await fs.promises
    .readFile('credentials.json')
    .catch((e) => console.log('Error loading client secret file:', e));
  if (!credentielsRaw) return;
  const credentiels = JSON.parse(credentielsRaw.toString());
  const authToken = await asyncAuthorize(credentiels);
  return authToken;
}
