package com.example.studentms.config;


import com.example.studentms.model.Admin;
import com.example.studentms.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner{

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.default.email}")
    private String defaultEmail;

    @Value("${admin.default.password}")
    private String defaultPassword;

    @Override
    public void run(String... args) {
        if (adminRepository.findByEmail(defaultEmail).isEmpty()) {
            Admin admin = new Admin();
            admin.setEmail(defaultEmail);
            admin.setPassword(passwordEncoder.encode(defaultPassword));
            admin.setFullName("System Administrator");
            adminRepository.save(admin);
            System.out.println("Default admin created -> email: " + defaultEmail + " password: " + defaultPassword);
        }
    }
}
