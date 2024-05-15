package com.bookify.backend.service.impl;

import com.bookify.backend.service.FileStorageService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileStorageServiceImpl implements FileStorageService {
    @Value("${application.file.upload.photos-path}")
    private String fileUploadPath;

    @Override
    public String saveFile(@NonNull MultipartFile file) {
        return uploadFile(file);
    }

    @Override
    public void deleteFile(@NonNull String filePath) {
        try {
            Path path = Paths.get(filePath);
            Files.deleteIfExists(path);
            log.info("File deleted: {}", filePath);
        } catch (IOException e) {
            log.error("Failed to delete the file", e);
        }
    }

    private String uploadFile(@NonNull MultipartFile file) {

        File targetFolder = new File(fileUploadPath);
        if (!targetFolder.exists()) {
            boolean folderCreated = targetFolder.mkdir();

            if (!folderCreated) {
                log.warn("Failed to create the target folder");
            }
        }

        final String fileExt = getFileExtension(file.getOriginalFilename());
        String targetFilePath = fileUploadPath + File.separator + System.currentTimeMillis() + "." + fileExt;
        Path targetPath = Paths.get(targetFilePath);

        try {
            Files.write(targetPath, file.getBytes());
            log.info("File saved to: {}", targetFilePath);
            return targetFilePath;
        } catch (IOException e) {
            log.error("File was not saved", e);
        }

        return null;
    }

    private String getFileExtension(String fullFilename) {
        if (fullFilename == null || fullFilename.isEmpty()) {
            return "";
        }

        int lastDotIndex = fullFilename.lastIndexOf(".");

        if (lastDotIndex == -1) {
            return "";
        }

        return fullFilename.substring(lastDotIndex + 1).toLowerCase();
    }
}
