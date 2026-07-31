package com.example.studentms.repository;

import com.example.studentms.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    List<Student> findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email);
}
