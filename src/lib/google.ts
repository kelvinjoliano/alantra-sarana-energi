// src/lib/google.ts

import { google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/spreadsheets",
];

export function getGoogleAuth() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });

  return auth;
}

export function getDrive() {
  const auth = getGoogleAuth();
  return google.drive({ version: "v3", auth });
}

export function getSheets() {
  const auth = getGoogleAuth();
  return google.sheets({ version: "v4", auth });
}

// Buat subfolder per pendaftar di dalam folder utama
export async function createPendaftarFolder(nama: string): Promise<string> {
  const drive = getDrive();
  const folderName = `${new Date().toISOString().split("T")[0]}_${nama.replace(/\s+/g, "_")}`;

  const res = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
    },
    fields: "id, webViewLink",
  });

  return res.data.id!;
}

// Upload file ke folder pendaftar
export async function uploadFileToDrive(
  folderId: string,
  fileName: string,
  mimeType: string,
  buffer: Buffer,
): Promise<string> {
  const drive = getDrive();
  const { Readable } = await import("stream");

  const stream = Readable.from(buffer);

  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: stream,
    },
    fields: "id, webViewLink",
  });

  // Set permission public viewable
  await drive.permissions.create({
    fileId: res.data.id!,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  return res.data.webViewLink!;
}

// Append data ke Google Sheets
export async function appendToSheet(values: string[][]) {
  const sheets = getSheets();

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID!,
    range: "Sheet1!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });
}

// Pastikan header ada di baris pertama sheet
export async function ensureSheetHeader() {
  const sheets = getSheets();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID!,
    range: "Sheet1!A1:Z1",
  });

  const firstRow = res.data.values?.[0];
  if (!firstRow || firstRow.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID!,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            "Tanggal Daftar",
            "Nama Lengkap",
            "Email",
            "NIK",
            "No HP",
            "Tempat Lahir",
            "Tanggal Lahir",
            "Jenis Kelamin",
            "Alamat Lengkap",
            "Kode Pos",
            "Lulusan Pendidikan",
            "Skema",
            "Metode Sertifikasi",
            "Penanggung Jawab",
            "Folder Drive",
            "KTP",
            "Ijazah",
            "Pas Foto",
            "Surat Pengalaman Kerja",
          ],
        ],
      },
    });
  }
}
