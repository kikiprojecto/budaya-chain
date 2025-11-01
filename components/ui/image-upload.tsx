'use client';

import { useState, useRef } from 'react';
import { uploadImage, validateImageFile, formatFileSize, type ImageBucket } from '@/lib/upload';
import { Button } from './button';

interface ImageUploadProps {
  bucket?: ImageBucket;
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: string) => void;
  maxFiles?: number;
  existingImages?: string[];
  onRemoveImage?: (url: string) => void;
}

export function ImageUpload({
  bucket = 'product-images',
  onUploadComplete,
  onUploadError,
  maxFiles = 5,
  existingImages = [],
  onRemoveImage,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [previewUrls, setPreviewUrls] = useState<string[]>(existingImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check max files limit
    if (previewUrls.length + files.length > maxFiles) {
      onUploadError?.(`Maximum ${maxFiles} images allowed`);
      return;
    }

    setUploading(true);
    setUploadProgress('Validating files...');

    try {
      const fileArray = Array.from(files);

      // Validate all files first
      for (const file of fileArray) {
        const validation = validateImageFile(file);
        if (!validation.valid) {
          onUploadError?.(validation.error || 'Invalid file');
          setUploading(false);
          return;
        }
      }

      // Upload files one by one
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        setUploadProgress(`Uploading ${i + 1}/${fileArray.length}...`);

        const result = await uploadImage(file, bucket);

        if (result.success && result.url) {
          setPreviewUrls(prev => [...prev, result.url!]);
          onUploadComplete?.(result.url);
        } else {
          onUploadError?.(result.error || 'Upload failed');
        }
      }

      setUploadProgress('Upload complete!');
      setTimeout(() => setUploadProgress(''), 2000);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error: any) {
      console.error('Upload error:', error);
      onUploadError?.(error.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (url: string) => {
    setPreviewUrls(prev => prev.filter(u => u !== url));
    onRemoveImage?.(url);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          type="button"
          onClick={handleButtonClick}
          disabled={uploading || previewUrls.length >= maxFiles}
          className="w-full"
        >
          {uploading ? uploadProgress : `Upload Images (${previewUrls.length}/${maxFiles})`}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Supported: JPG, PNG, GIF, WebP • Max 5MB per file
        </p>
      </div>

      {/* Image Previews */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-border"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(url)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
