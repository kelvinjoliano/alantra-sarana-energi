// src/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Upload file Buffer ke Cloudinary
 * @param buffer  - Buffer dari file
 * @param folder  - Folder tujuan di Cloudinary
 * @param publicId - (opsional) ID publik custom; kalau tidak diisi auto-generate
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string = "alantra/dokumen",
  publicId?: string,
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const options: Record<string, unknown> = {
      folder,
      resource_type: "auto",
      type: "upload",
      access_mode: "public",
      public_id_prefix: publicId,
      use_filename: true,
      unique_filename: true,
      ...(publicId && { public_id: publicId }),
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload gagal"));
          return;
        }
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );

    uploadStream.end(buffer);
  });
}

/**
 * Hapus file dari Cloudinary berdasarkan publicId
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
}
