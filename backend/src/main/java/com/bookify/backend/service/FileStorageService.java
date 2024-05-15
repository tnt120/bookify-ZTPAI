package com.bookify.backend.service;

import lombok.NonNull;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String saveFile(@NonNull MultipartFile file);
    void deleteFile(@NonNull String filePath);
}
