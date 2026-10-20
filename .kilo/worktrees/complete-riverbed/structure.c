#include <stdio.h>

// Define a structure to store student details
struct Student {
    char name[50];
    float marks[5];
};

int main() {
    struct Student student;
    float total = 0, average;

    // Get student name
    printf("Enter student's name: ");
    fgets(student.name, sizeof(student.name), stdin);

    // Get marks for 5 subjects
    printf("Enter marks for 5 subjects:\n");
    for (int i = 0; i < 5; i++) {
        printf("Subject %d: ", i + 1);
        scanf("%f", &student.marks[i]);
        total += student.marks[i];
    }

    // Calculate average
    average = total / 5;

    // Display student details
    printf("\nStudent Name: %s", student.name);
    printf("Total Marks: %.2f\n", total);
    printf("Average Marks: %.2f\n", average);

    return 0;
}
