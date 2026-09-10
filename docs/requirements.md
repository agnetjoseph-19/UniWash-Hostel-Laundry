# UniWash - Smart Hostel Laundry Management System

## Project Type
Web-Based Laundry Management System

## Main Users
1. Student
2. Administrator
3. Laundry Staff

## Technology Stack
Frontend: React.js
Backend: Node.js + Express.js
Database: MongoDB
Communication: REST API

## Problem Statement

Traditional hostel laundry services may involve manual booking,
manual communication, scheduling conflicts, difficulty tracking
laundry status, unclear pickup and delivery information, and
difficulty handling payments and complaints.

UniWash provides a centralized digital system for managing the
complete hostel laundry process.

## Main Objective

 To develop a centr alized Smart Hostel Laundry Management System that allows students to book laundry services, make payments, select collection points, track laundry progress, and submit complaints while allowing administrators and laundry staff to manage the complete laundry operation efficiently.

 ## Student Module
 
  The student should be able to: - Register - Login - Logout - View profile - Select laundry service - Select laundry date - View available slots - Book laundry slot - Select collection point - View pickup time - View drop-off time - Make payment - View booking details - Track laundry status - View expected delivery - Submit complaint - View complaint status

  ## Laundry Services
   1. Wash + Dry + Iron 
   2. Wash + Starch + Dry + Iron 
   3. Ironing Only

   Service 1 Name: Wash + Dry + Iron Price: ₹___ 
   Service 2 Name: Wash + Starch + Dry + Iron Price: ₹___ 
   Service 3 Name: Ironing Only Price: ₹___

   ## Service Days
   
    Laundry booking/service is available on: - Monday - Wednesday - Friday

    This means UniWash should eventually prevent normal bookings on Tuesday, Thursday, Saturday and Sunday unless the admin changes the schedule.

Example:

Student chooses Monday
→ Allowed

Student chooses Tuesday
→ Not available

## Pickup and Drop-off Schedule 

Pickup Time: 7:00 AM - 9:00 AM Drop-off Time: 3:00 PM - 5:00 PM

Pickup

Laundry is collected from the student.

Student gives clothes
↓
Laundry staff collects them
Drop-off

Finished clothes are returned.

Laundry processing completed
↓
Laundry returned to collection point/student

## Collection Points 
1. Girls Hostel 
2. PG Boys Hostel 
3. College Store

Example:

Collection Point:
Girls Hostel

Later this will probably be a dropdown:

Select Collection Point
▼
Girls Hostel
PG Boys Hostel
College Store

## Laundry Booking 
A student creates a laundry booking by selecting: - Laundry service - Laundry date - Available slot - Collection point Each booking should have a unique booking ID.

For example:

Booking ID: UW1001

Student: Aggu
Service: Wash + Dry + Iron
Date: Monday
Slot: 8:00 AM
Collection Point: Girls Hostel
Status: Booked

## Intelligent Slot Allocation 
The system should check the available capacity of a laundry slot before confirming a booking. If the selected slot has available capacity: Booking is confirmed. If the selected slot is full: The system should suggest another available slot.

## Payment 
Students should be able to make payment for an individual laundry booking. The payment should be connected to the corresponding booking. Payment status should include: - Pending - Paid - Failed

Add:

## Laundry Status Tracking

Laundry status should move through the following stages:

1. Booked
2. Collected
3. Washing
4. Drying
5. Ironing
6. Ready for Delivery
7. Delivered

## 48-Hour Delivery Tracking 
The system should calculate and display the expected delivery deadline for a laundry order. Laundry should normally be completed within the defined 48-hour service period. The administrator should be able to identify pending and delayed orders.

## Complaint Management 
Students should be able to submit complaints regarding their laundry booking or service. Complaint information should contain: - Complaint ID - Student - Booking - Complaint description - Complaint status - Date submitted - Resolution

## Administrator Module 
Administrator should be able to: - Login - View dashboard - Manage students - Manage laundry staff - Manage laundry services - Manage service prices - Manage service days - Manage slots - Manage slot capacity - Manage bookings - Manage collection points - View payments - Manage laundry orders - Monitor laundry status - Monitor 48-hour delivery - View delayed orders - Manage complaints - Resolve complaints

## Laundry Staff Module 
Laundry staff should be able to: - Login - View assigned laundry orders - View student booking details - View selected service - View collection point - View pickup information - Mark laundry as collected - Update laundry processing status - Mark laundry as ready for delivery - Update delivery status - Mark laundry as delivered

## User Roles 
### Student Can access student features only. 
### Laundry Staff Can access laundry processing and delivery features. 
### Administrator Can manage the complete UniWash system.

## Functional Requirements 
FR01 - User Registration FR02 - User Login FR03 - Role-Based Access FR04 - Laundry Service Selection FR05 - Laundry Date Selection FR06 - Slot Availability Checking FR07 - Intelligent Slot Allocation FR08 - Laundry Booking FR09 - Collection Point Selection FR10 - Pickup and Drop-off Information FR11 - Individual Payment FR12 - Booking Confirmation FR13 - Laundry Status Tracking FR14 - 48-Hour Delivery Tracking FR15 - Complaint Submission FR16 - Complaint Status Tracking FR17 - Student Management FR18 - Laundry Staff Management FR19 - Service Management FR20 - Slot Management FR21 - Booking Management FR22 - Payment Management FR23 - Collection Point Management FR24 - Laundry Order Management FR25 - Complaint Management FR26 - Laundry Status Updating FR27 - Delivery Management

## Non-Functional Requirements 
### Security Passwords must be stored securely. ### Usability The website should be simple and easy to use. 
### Performance Pages and booking operations should respond quickly. 
### Reliability Booking and payment information should be stored correctly. 
### Availability Users should be able to access the system whenever the server is available. 
### Maintainability The application should use a modular structure so features can be changed or updated easily. 
### Responsive Design The interface should work properly on desktop and mobile devices.

