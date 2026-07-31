package com.example.studentms.service;


import com.example.studentms.model.Student;
import com.example.studentms.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(String id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(String id, Student updatedStudent) {
        Student existing = getStudentById(id);

        existing.setFullName(updatedStudent.getFullName());
        existing.setEmail(updatedStudent.getEmail());
        existing.setPhoneNumber(updatedStudent.getPhoneNumber());
        existing.setCourse(updatedStudent.getCourse());
        existing.setAge(updatedStudent.getAge());
        existing.setGender(updatedStudent.getGender());
        existing.setAddress(updatedStudent.getAddress());

        return studentRepository.save(existing);
    }

    public void deleteStudent(String id) {
        Student existing = getStudentById(id);
        studentRepository.delete(existing);
    }

    public List<Student> searchStudents(String query) {
        return studentRepository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(query, query);
    }

    public long countStudents() {
        return studentRepository.count();
    }
}
