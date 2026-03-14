import React, { useState, useEffect, useRef } from 'react';
import { Send, Info, Phone, Calendar, Clock, BookOpen } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: "👋 Hello! I'm the West Rocks Middle School Assistant. I can help answer questions about school hours, the calendar, reporting absences, and lunch menus. How can I help you today?" 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // --- SCHOOL KNOWLEDGE BASE (TEXT VERSION) ---
  // You can literally copy and paste the raw text of your entire 40-page PDF handbook between these backticks!
  // I have started it off with the rules we established earlier.
  const HANDBOOK_TEXT = `
  22025-2026 025-2026 
STUDENTHANDBOOK 
STUDENTHANDBOOK 
MANUALDEL ESTUDIANTE 
MANUALDEL ESTUDIANTE 
81 WESTROCKSROAD,NORWALK,CT06851 203-899-2970 WWW.WRMS.NORWALKPS.ORG

2025-26 School Calendar 
Important Dates 

Aug 
(5 days) 
Sept 
(20 days) 
Oct 
(20 days) 
Aug 18 - Aug 19: New Teachers Report Aug 20: Convocation/All Teachers Report Aug 21 - 22: Professional Development for Staff 

M 
T W T 
F 
M 
T W T 
F 
M T W 
T 
F 
Aug 25: First Day of School 

4 
11 
NT 
18 
25 
5 
12 
NT 
19 
26 
6 
13 
CV 
20 
27 
7 
14 
PD 
21 
28 
1 
8 
15 
PD 
22 
29 
1 
8 
15 22 29 
2 
9 
16 23 30 
3 
10 17 24 
4 
11 18 25 
5 
12 19 26 
6 
13 20 27 
7 
PD 
14 
21 
28 
1 
8 
15 22 29 
2 
9 
16 23 30 
3 
10 17 24 31 
Sept 1: Labor Day No School 
Sep 23: Rosh Hashanah No School 
Oct 2: Yom Kippur No School 
Oct 13: Italian Heritage/Indigenous Peoples Day - No School Oct 14: Professional Development for Staff 

Nov 
(16 days) 
Dec 
(17 days) 
Jan 
(19 days) 
Nov 4: Professional Development for Staff (Election Day) 

M 3 
T W T PD 
F 
M 1 
T W T 
F 5 
M 
T W T 
F 
Nov 11: Veteran’s Day 
Nov 18-19: K-5 Conferences, 2 Hr Early Dismissal 

10 17 24 
4 
11 
C 
ED 
18 
25 
5 
12 
C 
ED 
19 
ED 
26 
6 
13 
CED 
20 
27 
7 
14 21 28 
8 
ED 
15 
22 
29 
2 
9 
16 
ED 
23 
30 
3 
10 17 24 31 
4 
11 18 25 
12 19 26 
5 
12 
19 
ED 
26 
6 
13 20 27 
7 
14 21 28 
1 
8 
15 22 29 
2 
9 
16 23 30 
Nov 20: K-5 Conferences, 2 Hr Early Dismissal Nov 26: 2 Hr Early Dismissal 
Nov 27 - 28: Thanksgiving No School 
Dec 8: 2 Hr Early Dismissal (PD for Staff) Dec 23: 2 Hr Early Dismissal 
Dec 24-Jan 2: Winter Recess No School 
(ConferenceNight)

Feb 
(15 days) 
Mar 
(21 days) 
Apr 
(16 days) 
Jan 1-2: Winter Recess No School Jan 19: Dr. MLK Jr. Day No School 

M 
T W 
T 
F 
M T W 
T 
F 
M 
T W T 
F 
Jan 26: 2 Hr Early Dismissal (PD for Staff) 

2 9 16 
3 
4 
5 
6 
2 
3 
4 
CED 
5 
C 
6 
13 
1 
2 
3 
Feb 16-20: Presidents’ Day Recess - No School 

23 
10 
11 
12 
13 
9 
10CED 11 
ED 
12 
20 
6 
7 
8 
9 
10 

17 24 
18 25 
19 26 
20 27 
16 23 
17 24 
18 25 
19 26 
27 
13 20 
14 21 
15 22 
16 23 
17 24 
Mar 10-11: K-5 Conferences, 2 Hr Early Dismissal 

ED 
30 
31 
ED 
27 
28 
29 
30 
Mar 12: K-5 Conferences, 2 Hr Early Dismissal Mar 20: Eid al-Fitr No School 
Mar 30: 2 Hr Early Dismissal (PD for Staff) 
(Conference Night) 

May 
(20 days) 
Jun 
(13 days) 
Jul W 
Apr 3: Good Friday 
Apr 6-10: Spring Recess 
Apr 27: 2 Hr Early Dismissal (PD for Staff) 

M 
T W T F 
M 
T W T 
F 
M 
T T 
F 

4 
ED 
11 
18 
25 
5 
12 19 26 
6 
13 20 27 
7 
14 21 28 
1 
8 
15 22 29 
1 
8 
15 22 
29 
2 
9 
ED 
16 
23 
30 
3 
10 
ED 
17 
24 
4 
11 18 25 
5 
12 19 26 
6 
13 20 27 
7 
14 21 28 
1 
8 
15 22 29 
2 
9 
16 23 30 
3 
10 17 24 31 
May 11: 2 Hr Early Dismissal (PD for Staff) 
May 25: Memorial Day 
Jun 16: 2 Hr Early Dismissal 
Jun 17: Tentative Last Day of School, 2 Hr Early Dismissal 

MAJOR RELIGIOUS & CULTURAL HOLIDAYS TOTAL DAYS Grades K-12: 182 days 

Sept 22-24 Rosh 
Hashanah 
Oct 1-2 Yom Kippur Oct 20 Diwali 
Nov 27 Thanksgiving Dec 14-Dec 22 Hanukkah Dec 25 Christmas 
Dec 26-Jan 1 Kwanzaa Jan 1 New Year’s Day 
KEY 
Jan 6 Three Kings Day Jan 19 Dr. Martin Luther King Jr. Day 
Feb 17 Lunar New Year Feb 17 Ramadan begins Feb 18 Ash Wednesday 
Mar 19-20 Eid al-Fitr Apr 1-9 Passover 
Apr 3 Good Friday 
Apr 5 Easter 
Apr 12 Orthodox Easter Apr 22 Earth Day 
May 10 Mother’s Day May 26-27 Eid al-Adha Jun 19 Juneteenth 
Jun 21 Father’s Day Jun 28 LGBTQ Pride Day 
** Inclement weather days are added to the end of the school year. 
APPROVED: 5/20/2025 

First Day of School Holidays. NoSchool PD/Staff Days. No School Early Dismissal 
NT New Teachers Report 
CV Convocation/All Teachers Report PD Professional Development Day 
C K-5 Conferences 
ED 2-Hour Early Dismissal *Kindergarten Registration Opens 

Table of Contents 

District Calendar 2025-2026 ………………………………………………………………………………… West Rocks Vision, Mission, and Values ……………………………………………………………… RULER Acronym Definitions ……………………………………………………………………………….. 
RULER Mood Meter, Charter, Blueprint, MetaMoment ………….………..………..……… Daily Schedules (by grade level) …....…………………………………………………………………… NPD Dress Code Policy and Expectations.……………………………………………………………. Grading: Scale, Honor Roll, Homework………………………………………………………………… PowerSchool Portal, Report Cards………………………………………………………………………… 
Standardized Testing Information……………………………………………………………………….. Cell Phone Policy………………………………………………………………………………………………….. Lockers…………………………………………………………………………………………………………………. Health Services Information 
Nurse………………………………………………………………………………………………………. Physical Education Medical Excuses………………………………………………………… Attendance………………………………………………………………………………………………………… Late Arrival and Early Dismissal from School: Medical, Non-medical…………………. Visitors and Food Delivery………………………………………………………………………………….. WRMS on Social Media………………………………………………………………………………………. NPS Code of Conduct and Restorative Practices………………………………………………… Bullying/Safe School Climate District Policy……………………………………………………….. One-to-One Chromebook Expectations, Repair Costs……………………………………….. National Junior Honor Society …………………………………………………………………………… 
Emergency Protocols (drills, evacuations)…………………………………………………………. Staff Table of Organization…………….………………….………………………………………………. 
Emotional Vocabulary Glossary ………………………………………………………………………… 
West Rocks Middle School Contact Information 
Main Office Phone Number: (203) 899 – 2970 
Website (through): www.norwalkps.org 
2 
4 
5 
6-8 
9 
10 
11 
11 
12 
12 
12 
12 
13 
13 
13 
13-14 14 
14-26 27 
28 
30-31 32 
33 
34-38 

Principal 
AssistantPrincipal AssistantPrincipal MainOfficeSecretary Secretary 
Secretary 
Dean of Students 
Name 
Adam Reynolds Elizabeth Amaral Jules Douge 
Nazira Coto 
Patricia Morrell Maylen Martinez Paul Rodgers 
Extension 17600 
17600 
17600 
17602 
17601 
17613 
17661 
Email 
reynoldsa@norwalkps.org amarale@norwalkps.org dougej@norwalkps.org coton@norwalkps.org morrellp@norwalkps.org martinezm@norwalkps.org rodgersp@norwalkps.org 

3 

Students learn best when they are engaged academically and emotionally. 
Los estudiantes aprenden mejor cuando están comprometidos académica y emocionalmente.4 
5

6



7





8

Grade 6 (8:00)Regular Day 

2025-2026 Schedule 
Grade 6 (8:00)2 HR Early Dismissal 
Grade 6 (10:00)2 HR Delayed Opening 

LOCKERS 
beforehomeroom 
LOCKERS before homeroom 
LOCKERSbefore homeroom 

8:15 - 8:20 (5) 8:24 - 9:07 (43) 
HR/News (per 1) RA/WL (per 2) 
8:15 - 8:20 (5) 8:24 - 8:47 (23) 
HR/News (per 1) RA/WL (per 2) 
10:15 - 10:20 (5) 10:24 - 10:47 (23) 
HR/News (per 1) RA/WL (per 2) 

LO CKE R S 
9:11 - 10:17 (66) Core1(per3-4) Morning Meeting (7 min) 
LO CKE R S 
8:51 - 9:35 (44) Core 1 (per 3-4) Morning Meeting (4 min) 
LO CKE R S 
10:51 - 11:35 (44) Core 1 (per 3-4) Morning Meeting (4 min) 

10:20 - 11:19 (59) Core2(per5-6) 
9:38 - 10:18 (40) Core 2 (per 5-6) 
11:38 - 12:18 (40) 
Core 2 (per 5-6) 

LO CKE R S 
Lunch, Recess 
LO CKE R S 
Lunch, Recess 
LO CKE R S 
Lunch, Recess 

11:23 - 11:53 (30) 11:59 - 1:01 (62) 
(w/ per7-8) Core 3(per7-8) 
10:22 - 10:52 (30) 10:57 - 11:39 (42) 
(w/ per 7-8) Core 3 (per 7-8) 
12:22 - 12:52 (30) 12:57 - 1:39 (42) 
(w/ per 7-8) Core 3 (per 7-8) 

MetaMoment (3 min) 
1:04 - 2:03 (59) Core 4 (per 9-10) LO CKE R S 
2:07 - 2:50 (43) RA/WL (per 11) 2:50 Dismissal 
Grade 7 (8:00)Regular Day 
MetaMoment (2 min) 
11:42 - 12:22 (40) Core 4 (per 9-10) LO CKE R S 
12:27 - 12:50 (23) RA/WL (per 11) 12:50 Dismissal 
Grade 7 (8:00)2 HR Early Dismissal 
MetaMoment (2 min) 
1:42 - 2:22 (40) Core 4 (per 9-10) LO CKE R S 
2:27 - 2:50 (23) RA/WL (per 11) 2:50 Dismissal 
Grade 7 (10:00)2 HR Delayed Opening 

LOCKERS 
beforehomeroom 
LOCKERS before homeroom 
LOCKERSbefore homeroom 

8:15 - 8:20 (5) 8:24 - 9:30 (66) 
HR/News (per 1) Core 1 (per 2-3) 
8:15 - 8:20 (5) 8:24 - 9:08 (44) 
HR/News (per 1) Core 1 (per 2-3) 
10:15 - 10:20 (5) 10:24 - 11:08 (44) 
HR/Adv/News Core 1 (per 2-3) 

Morning Meeting (7 min) 
Morning Meeting (4 min) 
Morning Meeting (4 min) 

9:33 - 10:32 (59) Core 2 (per 4-5) 
9:11 - 9:51 (40) Core 2 (per 4-5) 
11:11 - 11:51 (40) 
Core 2 (per 4-5) 

LO CKE R S 
LO CKE R S 
LO CKE R S 

10:36 - 11:19 (43) 11:22 - 12:21 (59) 
RA/WL (per 6) Core 3 (per 7-8) 
9:55 - 10:18 (23) 10:21 - 11:01 (40) 
RA/WL (per 6) Core 3 (per 7-8) 
11:55 - 12:18 (23) 12:21 - 1:01 (40) 
RA/WL (per 6) Core 3 (per 7-8) 

LO CKE R S 
12:25 - 1:08 (43) RA/WL (per 9) LO CKE R S 
Lunch, Recess 
LO CKE R S 
11:06 - 11:29 (23) RA/WL (per 9) LO CKE R S 
Lunch, Recess 
LO CKE R S 
1:06 - 1:29 (23) RA/WL (per 9) LO CKE R S 
Lunch, Recess 

1:12 - 1:42 (30) 1:48 - 2:50 (62) 
(w/ per 10-11) Core 4 (per 10-11) 
11:33 - 12:03 (30) 12:08 - 12:50 (42) 
(w/ per 10-11) Core 4 (per 10-11) 
1:33 - 2:03 (30) 2:08 - 2:50 (42) 
(w/ per 10-11) Core 4 (per 10-11) 

MetaMoment (3 min) 2:50 Dismissal 
Grade 8 (8:00)Regular Day 
MetaMoment (2 min) 
12:50 Dismissal 
Grade 8 (8:00)2 HR Early Dismissal 
MetaMoment (2 min) 
2:50 Dismissal 
Grade 8 (10:00)2 HR Delayed Opening 

LOCKERS 
beforehomeroom
LOCKERS before homeroom 
LOCKERSbefore homeroom 

8:15 - 8:20 (5) 8:24 - 9:30 (66) 
HR/News (per 1) Core 1 (per 2-3) 
8:15 - 8:20 (5) 8:24 - 9:05 (41) 
HR/News (per 1) Core 1 (per 2-3) 
10:15 - 10:20 (5) 10:24 - 11:05 (41) 
HR/Adv/News Core 1 (per 2-3) 

Morning Meeting (7 min) 
LO CKE R S 
9:34 - 10:17 (43) RA/WL (per 4) LO CKE R S 
Morning Meeting (3 min) 
LO CKE R S 
9:09 - 9:38 (29) RA/WL (per 4) LO CKE R S 
Morning Meeting (3 min) 
LO CKE R S 
11:09 - 11:38 (29) RA/WL (per 4) LO CKE R S 

10:21 - 11:20 (59) 11:23- 12:06 (43) 
Core 2 (per 5-6) RA/WL (per 7) 
9:42 - 10:19 (37) 10:22 - 10:51 (29) 
Core 2 (per 5-6) RA/WL (per 7) 
11:42 - 12:19 (37) 12:22 - 12:51 (29) 
Core 2 (per 5-6) RA/WL (per 7) 

LO CKE R S 
Lunch, Recess 
LO CKE R S 
Lunch, Recess 
LO CKE R S 
Lunch, Recess 

12:10 - 12:40 (30) 12:46 - 1:48 (62) 
(w/ per 8-9) Core 3 (per 8-9) 
10:56 - 11:26 (30) 11:31 - 12:10 ( 39) 
(w/ per 8-9) Core 3 (per 8-9) 
12:56 - 1:26 (30) 1:31 - 2:10 (39) 
(w/ per 8-9) Core 3 (per 8-9) 

MetaMoment (3 min) 
1:51 - 2:50 (59) Core 4 (per 10-11) 2:50 Dismissal 
MetaMoment (2 min) 
12:13 - 12:50 (37) Core 4 (per 10-11) 12:50 Dismissal 
MetaMoment (2 min) 
2:13 - 2:50 (37) Core 4 (per 10-11) 2:50 Dismissal 

NPS Dress Code 

School attire should be appropriate. Dress with pride in yourself and your school community! 
To maintain an environment conducive to the educational process, the Norwalk Board of Education (the “Board”) prohibits the following from wear during the academic school day: 
• Coats, jackets, or other attire normally worn as outerwear. Outerwear includes coats, jackets, windbreakers, nylon pullovers, down vests, and other clothing the administration deems inappropriate. Outer wear shall not be worn, carried, or kept in the classroom during regular school hours. 
• Head coverings of any kind including but not limited to scarves, bandannas, masks, headbands, visors, kerchiefs, athletic sweatbands, hats, caps, or hoods. Head coverings shall not be worn, carried, hung on belts or around the neck, or kept in the classroom during regular school hours. Approved coverings worn as part of a student’s religious practice or belief or as required or permitted in conjunction with school district health and safety protocols shall not be prohibited under this policy. Nothing in this policy shall be construed to prohibit protective hairstyles. “Protective hairstyles” includes but is not limited to wigs, headwraps, and hairstyles such as individual braids, cornrows, twists, Bantu knots, afros and afro puffs. 
• Items listed above must be secured in the student’s locker or other storage area before school starts. Items not stored will be confiscated by the administration. • Footwear which marks floors or is a safety hazard. 
• Sunglasses whether worn or carried unless required pursuant to a documented medical issue. • “Name” or other oversized metal belt buckles and all metal belts or combination of metal and leather 
belts. 
• Spiked or studded bracelets, oversized or multi-finger rings, belts or any other article of attire with spikes or studs attached, or any other clothing item that may present a safety hazard to the student, other students or staff. 
• 
Attire or accessories that contain vulgarity or that contain overly offensive or disruptive writing or pictures which are likely to disrupt the educational environment. 
• Attire or accessories depicting or suggesting violence so as to disrupt the educational environment or that provokes others to act violently or causes others to be intimidated by fear of violence or that constitute “fighting words” including but not limited to attire or accessories depicting the Confederate flag and/or the Nazi swastika. 
• Attire or accessories that depict logo or emblems that encourage the use of drugs, tobacco products, or alcoholic beverages. 
• Shirts and/or blouses that reveal the abdomen, chest, or undergarments. 
• See-through clothing, tank tops, or sleeveless shirts. 
• Shorts, miniskirts, or pants that reveal the upper thigh or undergarments. Spandex garments are allowed only if they are covered by shorts or skirts. 
Students who fail to comply with Board policy and regulations concerning student dress will be subject to school discipline up to and including expulsion in accordance with the Board’s policy on student discipline. 
Staff should direct a student to change if the dress code is violated. Parents/guardians will be contacted and the office has extra clothing. If a student refuses, a staff member will contact the office to report the violation and refusal.
10 

Grading System 

Grades are based on the student's achievement/performance using the modifications necessary to fulfill the subject area requirements. The district's grading policy/system applies to students receiving regular or modified curriculum. The following are the letter grades that make up the grading system at the secondary schools: 
GPA Unit Weight 

Grade ValueGPA Unit Weight 
Description 
Grade ValueDescription 

A 
A B+ B 
B 
C+ 
(93-100) (90-92) (87-89) (83-86) (80-82) (77-79) 
4.00 3.70 3.30 3.00 2.70 2.30 
Superior 
Above Average 
Average 
Honor Roll 

C 
C 
D+ D 
D 
F 
(73-76) (70-72) (67-69) (63-66) (60-62) (0-59) 
2.00 1.70 1.30 1.00 0.70 0.00 
Average 
Below Average Failing 

A grade point average of 3.4 or better is needed to be on the High Honor Roll. A grade point average of 3.0 or better is needed to be on the Honor Roll. 
Homework 

Upon entering middle school, the amount of outside preparation required to complete homework increases substantially, particularly for the college-bound student. Independent learning skills and effective time management toward the completion of short-term and long-term assignments is valuable preparation for the rigorous requirements of the college curriculum. Examples of homework that may be assigned include but are not limited to: 

Reading assignments 
• 
● 
● 
Taking notes on reading assignments 
• 
● 
Constructing projects 
• 
● 
Problem-solving 
• 
Completing practice exercises Writing assignments 
Conducting research 
Studying for tests or quizzes 

Parents are encouraged to speak with their student’s teacher to appropriately address any time management concerns. 
PowerSchool Student and Parent Portal 

Grades, attendance, and other student information are accessible through our district’s student reporting system PowerSchool. Report cards are posted online at the end of each quarter November, February, April, and June. District Code: 
PRFS
11 
Testing Information 

The Smarter Balanced Assessment (SBA) is a standardized test consortium. It creates Common Core State Standards-aligned tests ("adaptive online exams") to be used in several states. It uses automated essay scoring. Beginning in the Spring of 2015, SBA began assessing students with their new assessment format. The assessments are given in grades 3 - 8 and 11, in the content areas of Math and English Language Arts. Each test called a Summative Assessment, consists of a Performance Task (PT) and a Computer-Adaptive Test (CAT). 
PSAT 8/9: This test is administered to all grade 8 and 9 students each fall. It is intended to be used as a baseline of student achievement as they enter high school on topics that matter most to college and career success. 
Northwest Evaluation Association (NWEA) or Measures of Academic Progress (map): This formative assessment is given to grade 6, 7 and 8 and students to determine their proficiency in reading, and mathematics. It is an adaptive, computer-based assessment that is proctored in the students’ classes. These scores are used to determine instruction, specifically acceleration and remediation. 
Language Assessment System (LAS) Links: English proficiency testing of English Language Learners (ELL) occurs upon registration. The test consists of 4 sections – listening, speaking, reading, and writing. All students designated as ELL are tested each year on the LAS Links to measure progress towards English language proficiency. 
Connecticut Physical Fitness Assessment (CPFA): All students must have their CT Physical Fitness Assessment scores reported to the State throughout their school career. The school is measured by the State according to both participation and passing rates. 
Cell Phones 

All secondary schools in Norwalk Public Schools adhere to NPS BOE Policy: Use of Personal Devices 5000 5030. Cell phones are not allowed to be used in school. As more students have cell phones to be able to communicate with family, friends, and caretakers, we understand students will bring them to school. Cell phones must be kept in the student’s locker when they enter the school and remain there until they are dismissed. If used during the day, cell phones will be confiscated by staff. 
Lockers 

Each student will be assigned a locker near their homeroom to use throughout the year. This is their locker for the year and the combination should not be shared with others. There will be specific times built into the schedule for students to use their lockers. Students are responsible for all the contents in his or her assigned locker at all times. The administration has the right to search a student’s locker for safety reasons. 
Nurse’s Office 

One registered nurse supervises the nurse’s office. Students who feel ill or are injured during the school day should report to a nurse after obtaining permission from their teacher. If further care or treatment is required, a parent/guardian will be notified and should provide immediate transportation if dismissal from school is warranted. If the nurses are out of the office, the Main Office will handle any emergency. 

Hours: 
Phone: Location: 
8:00 am – 3:00 pm school days 
(203) 899 - 2970, ext. 17619 
Down the hallway from the main office 
12

Physical Education Medical Excuses 

For an excused absence from physical education during the school year, a doctor’s excuse in writing is necessary. If the doctor’s written excuse states” until further notice,” a second written note is required to permit the student to return to physical education classes. 
Attendance 
Research shows that consistent attendance is essential to student achievement and graduation. Missing too much school (chronic absence and truancy) can lead to school drop-out, academic failure and juvenile delinquency. A truant is defined as a student who has 4 unexcused absences from school in one month (30 consecutive calendar days) or 10 unexcused absences in one school year. Parents and guardians are responsible for notifying the school by phone and in writing when students are absent. 
Late Arrival and Early Dismissal from School 
Late Arrival: Parents or guardians should call the office and notify the school if a student will be late. When students arrive late to school, they will sign-in in the main office and their attendance will be recorded appropriately. 
In the interest of student safety and to ensure an orderly school-wide dismissal procedure, the deadline for requesting an early dismissal is 2:30 PM. No students will be called from their classrooms for dismissal after this time. We appreciate your cooperation in helping our dismissal process run safely and efficiently.
Early Dismissal - Medical: 
Students who become ill during the school day should report to the nurse. Parental consent is required for dismissal. For medical or dental appointments, students should go directly to the nurse, who will then verify the appointment with the doctor’s or dentist’s office. NOTE: Early dismissal for medical appointments will count towards the attendance policy. 
Early Dismissal - Non-Medical: 
We urge all families to schedule personal appointments, etc., during non‐school time. We recognize the fact that an occasion may arise which necessitates a student leaving school early. All requests for early dismissal must be made in the morning, during homeroom. For personal, non-medical appointments, students should bring a written note to the main office. The secretary will then verify the appointment with the parent/guardian. No student will receive official approval to be dismissed unless the parent approves it verbally and in writing. 
Elevator Pass 
If a student is unable to use the stairs due to an illness or injury, he or she may request an elevator pass from the nurse’s office. Only students with a pass are allowed to use the elevator. In most cases, the student will be allowed to leave class a few minutes early and have one student assistant to carry his or her belongings. 
Emergency Contacts 
Students will be given an emergency form at the beginning of each school year. It is important that this form be completely filled out and returned promptly. Two adult emergency contacts should be listed, other than the parent/guardian. These contacts should be easily accessible in the parents’ absence. If any change in the contact information occurs during the school year, the school nurse should be notified so the records can be updated. 
Visitors and Food Delivery Services 

We welcome families and other visitors and take special care to guard the safety of our students and staff. All exterior doors remain locked during school hours. Only the main entrance is used during school hours. We ask that all visitors 
13 
go directly to the main office upon entering the building. All visitors must obtain a Visitor’s ID badge at the security desk and sign in and out. Please call the main office in advance to schedule an appointment for a visit. 
Our school policy is that we do not allow food delivery services to deliver food to students at West Rocks during the school day. When these services are delivered to the school, it becomes a safety issue as we have cars pulling up and accessing the school constantly. Students should not be ordering this on their own and parents/guardians should not 
have companies deliver either. Thank you for adhering to this expectation. As always, if a family needs to drop off lunch for a student, please come to the main entrance. 
West Rocks on Social Media!

Follow us on Instagram and Facebook. 

Follow West Rocks on Instagram: wrms_ct 
Follow West Rocks on Facebook: https://www.facebook.com/p/West-Rocks-Middle-School-100076430403630/ 

NPS Behavior Intervention Guide - Code of Conduct (electronic link) 

Norwalk Public Schools shall provide a complement of effective, age-appropriate strategies for maintaining a positive school climate and correct student behavior at District schools. The strategies shall focus on providing students with needed supports; communicating clear, appropriate, and consistent expectations and consequences for student conduct; and ensuring equity and continuous improvement in the implementation of District discipline policies and practices. 
The Superintendent or designee shall provide professional development as necessary to assist staff in developing the skills needed to effectively implement the disciplinary strategies adopted for District schools, including, but not limited to, consistent classroom management skills, effective accountability and positive intervention techniques, and development of strong, cooperative relationships with parents/guardians. 
14 
Code of Conduct 
In keeping in line with the idea of Restorative Practices, the code of conduct organizes student offenses into five distinct levels ranging from minor acts of misconduct (Level I) to the most significant and potentially illegal acts of misconduct (Level V). For each of these levels, a brief description, suggestions for intervention and protocols for response are provided to guide NPS staff and administration in making decisions. The decision to level acts of student misconduct may be modified based on the context and specific needs of the individual student. It is important to note that the levels of offenses are designed to limit, rather than assign, the severity of the discipline for an infraction. Thus, the available interventions and consequences of lower levels are available to subsequent levels. 
Please keep in mind that this code applies anytime a student is at school, on school property at any NPS, at a bus stop, on a NPS-sponsored bus, and any school event. This code is a guideline and does not limit the authority of the NPS or the Board of Education to suspend of expel a student. 

15 
15
16
17

18

19
20

21

22
23

24
25

26

DISTRICT POLICY: Bullying/Safe School Climate Plan 
I. PURPOSE 
The Board of Education (the “Board”) is dedicated to promoting and maintaining a positive learning environment where all students are welcomed, supported, and feel safe in school, socially, emotionally, intellectually and physically. The purpose of this policy is to address the existence of bullying in schools and to establish the guidelines for the development of the district’s Safe School Climate Plan. 
The Board expects prompt and reasonable investigations of alleged acts of bullying. The principal of each school or his/her designee is responsible for handling all complaints of alleged bullying. 
II. BULLYING PROHIBITED 
A. Bullying activities of any type are inconsistent with the educational goals of the school district and are prohibited at all times. No student, employee, volunteer, or contractor of the school district shall encourage, aid, or consent to bullying. No student, employee, volunteer, or contractor of the school district shall permit, condone, or tolerate bullying. Apparent permission or consent by a student being bullied does not lessen the prohibitions contained in this policy. 
B. Bullying is prohibited on school grounds, at a school-sponsored or school-related activity, function or program whether on or off school grounds, at a school bus stop, on a school bus or other vehicle owned, leased or used by a local or regional board of education, or through the use of an electronic device or an electronic mobile device owned, leased or used by the local or regional board of education. 
C. Bullying is also prohibited outside of the school setting if such bullying results in any of the following: (i) creates a hostile environment at school for the student against whom such bullying was directed, (ii) infringes on the rights of the student against whom such bullying was directed at school, or (iii) substantially disrupts the education process or the orderly operation of a school. 
D. Any form of discrimination and retaliation against an individual who reports or assists in the investigation of an act of bullying is also strictly prohibited. 
E. Any student who engages in bullying as defined in this policy may be subject to discipline up to and including expulsion. Any school employee who fails to respond to bullying as required by this policy and the district’s Safe School Climate Plan may be subject to discipline up to and including termination. 
27

Expectations for One-to-Computer Use (Chromebooks) Daily Use 
• 
Bring the Chromebook every day to all classes, fully charged, unless specifically instructed not to do so by their teacher. 
• 
Store everything in Google Drive, Microsoft, or your network drive. 
• 
Immediately comply with the teachers’ requests to shut down or put away any technology. Teachers have the discretion to determine when students may use technology in the classroom. 
• 
Leave personal laptops/tablets at home. 
Student Ownership/Security 
• 
Be responsible for the general care of the Chromebook. 
• 
Leave the ID label and barcode untouched and visible on both the Chromebook and charger. • 
Only protective covers can be personalized with stickers and overlays. 
• 
Report Chromebook malfunctions to staff as soon as possible 
• 
Use the Chromebooks in a safe, ethical, and responsible manner and use their Chromebook in the manner and purpose in which they are instructed to by their teacher. 
• 
Never leave the device in an unlocked locker or any unsupervised area. 
• 
If a Chromebook is stolen or lost it should be immediately reported to the student’s homeroom teacher. • 
If a Chromebook is found unattended it will be taken to the main office. 
• 
Adhere to the Norwalk Public Schools Acceptable Use Policy. 
Responsibility 
• 
Families are completely responsible for the care of the issued device. 
• 
If the Chromebook is lost, stolen, or damaged there is a replacement cost for the family. •• 
Students cannot use or bring in their own computers. They will be expected to use their assigned Chromebook as deemed appropriate by their teacher. 
Teachers may set additional requirements for technology use within their individual classrooms. 
Cost for Repairs 
• 
Screen Replacement $65 
• 
Keyboard Replacement $45 • 
Charger Replacement $15 
• 
Chromebook Replacement $350
28 

81 West Rocks Road 
Norwalk, CT 06851 
(203) 899 – 2970 
Norwalk Public Schools Code of Conduct 
West Rocks Middle School Expectations and Policies 
Código de conducta de las escuelas públicas de Norwalk 
Expectativas y políticas de la escuela secundaria West Rocks 
I _______________________(student name) have received a copy of the code of conduct and school-wide expectations (dress, phone, attendance…etc.). I also reviewed them with a teacher, counselor, or administrator. 
Yo ______________ (nombre del estudiante) he recibido una copia del código de conducta y las expectativas de toda la escuela (vestimenta, teléfono, asistencia, etc.). También los revisé con un maestro, consejero o administrador de la escuela. 
_________________________ ______________ ________ Student Signature Homeroom/Grade Date
29 
National Junior Honor Society 
West Rocks Middle School Chapter

The National Junior Honor Society (NJHS) elevates a school’s commitment to the values of scholarship, service, leadership, character, and citizenship. These five pillars have been associated with membership in the organization since its inception in 1929. 
Today, it is estimated that more than one million students participate in NJHS activities. NJHS chapters are found in all 50 states, US Territories, and around the world. Chapter membership not only recognizes students for their accomplishments, but challenges them to develop further through active involvement in school activities and community service. 
Everyday Pillars of NJHS 
Scholarship Service Leadership Character Citizenship 
Everyday Scholarship is a commitment to learning and growing on an educational path. It means making the most of the educational opportunities provided and seeking out learning, not only in school or similar settings, but also personally. Everyday Scholarship doesn’t require a minimum GPA—but it does require effort. More importantly, it 
30 

stems from a desire to contribute to this world in a positive way by building on one’s own knowledge, skills, and talent through different experiences. 
Everyday Service is seeking out and engaging in meaningful service. It calls for a service mindset, the desire to seek opportunities to help others as well as acts of service. As Honor Society students, many young teens and young adults at local chapters are required to meet minimum service participation requirements for service. 
Although hours are important, Everyday Service is seeing a need and fulfilling it voluntarily. Sometimes it’s driven by a passion for a specific cause or people in need. Other times, it’s driven by personal or family need, like taking care of siblings or other family members, or maybe even working part-time to help with family finances. 
Everyday Leadership builds on Everyday Service. Service and leadership oftentimes look very similar. Everyday Leadership is carrying oneself with dignity and taking ownership and responsibility for one’s own actions and participation. Being a public speaker, playing quarterback, or having an official title is not required for Everyday Leadership. Everyday Leadership means being an agent—someone who takes action and responsibility—of your own pathway. 
Everyday Character is valuing diverse cultures and building relationships that reflect love of self but also concern for others. There are endless attributes to good character: perseverance, respect, integrity, honesty, sacrifice—the list goes on. Good and noble character is a high calling. Oftentimes we don’t “see” character unless there is a public display of self-sacrifice, or more often, a very public mistake. Everyday Character is not about praiseworthy or blameworthy behavior but the personal commitment to ethical and compassionate decision making that affects oneself and others. 
Everyday Citizenship is accepting one’s place and role in the community and seeking to understand the concerns and strengths of that community. Community includes but is not limited to neighborhoods, tribes, and local and regional districts. For young people in particular, Everyday Citizenship is an opportunity to be educated about and to demonstrate care for the issues that impact those who are citizens in their shared community. At NASSP, we also believe that “global citizenship” is something that binds all of us together—adults, young people, and people from different nations across borders and boundaries. 
31

32
33

34
35

36

37

38


81 West Rocks Road 
Norwalk, CT 06851 
(203) 899 – 2970 
Norwalk Public Schools Code of Conduct 
West Rocks Middle School Expectations and Policies 
Código de conducta de las escuelas públicas de Norwalk 
Expectativas y políticas de la escuela secundaria West Rocks 
I _______________________(student name) have received a copy of the code of conduct and school-wide expectations (dress, phone, attendance…etc.). I also reviewed them with a teacher, counselor, or administrator. 
Yo ______________ (nombre del estudiante) he recibido una copia del código de conducta y las expectativas de toda la escuela (vestimenta, teléfono, asistencia, etc.). También los revisé con un maestro, consejero o administrador de la escuela. 
_________________________ ______________ ________ Student Signature Homeroom/Grade Date
29 

  // --- REAL AI INTEGRATION (GOOGLE GEMINI FREE TIER) ---
  const fetchAIResponse = async (userText) => {
    // This looks for a secret key in Vercel, or uses the one you paste here for testing.
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "PASTE_YOUR_API_KEY_HERE_FOR_TESTING"; 
    
    if (apiKey === "PASTE_YOUR_API_KEY_HERE_FOR_TESTING") {
      return "System Error: Please add your free Google Gemini API key to the code to activate my AI brain!";
    }

    // We moved the instructions to the BOTTOM so the AI doesn't forget them after reading the long text.
    // We also told it to be more forgiving with the messy PDF formatting.
    const prompt = `HANDBOOK TEXT:
    ${HANDBOOK_TEXT}
    
    -----------------
    INSTRUCTIONS:
    You are the friendly, helpful assistant for West Rocks Middle School. 
    Your goal is to answer the parent or student's question based ONLY on the handbook text provided above. 
    
    Please note: The text above was extracted directly from a PDF, so the formatting is very messy. Tables, schedules, and calendars are broken into raw text, and some words may be squished together. Please read carefully and use your reasoning to piece together the answer from the messy data.
    
    If you can reasonably infer the answer from the text, provide a clear, concise, and polite response.
    If the answer is truly NOT anywhere in the text, you MUST reply exactly with: "I couldn't find information about that in my current handbook. Please contact the main office directly at (555) 010-2000 or frontdesk@westrocks.edu for assistance."
    
    USER QUESTION: 
    ${userText}`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("API Error:", error);
      return "I'm having trouble connecting to my knowledge base right now. Please try again later!";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(), // Creates a unique ID
      sender: 'user',
      text: inputText.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Call the real AI instead of the keyword matcher!
    const aiText = await fetchAIResponse(userMessage.text);
    
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      sender: 'bot',
      text: aiText
    }]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-800 flex items-center justify-center">
      
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* --- LEFT SIDEBAR: Admin View / Knowledge Base Info --- */}
        <div className="hidden md:flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg text-green-800">
                < BookOpen size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Admin Panel</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              This prototype simulates a RAG (Retrieval-Augmented Generation) chatbot. It only answers questions based on the restricted knowledge base below.
            </p>
            
            <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wider">Active Knowledge Sources</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <Clock size={16} className="text-green-700" />
                Bell Schedule & Hours
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <Calendar size={16} className="text-green-700" />
                Academic Calendar 2025-2026
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <Phone size={16} className="text-green-700" />
                Staff Directory & Policies
              </li>
            </ul>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex gap-2 items-start">
                <Info size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-800">
                  <strong>Test it out!</strong> Try asking: <br/>
                  "What time does school start?" <br/>
                  "When is spring break?" <br/>
                  "My kid is sick today" <br/>
                  "Who won the football game?" <em>(Notice how it handles unknown info)</em>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: Chat Interface --- */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[80vh] max-h-[800px]">
          
          {/* Chat Header */}
          <div className="bg-green-800 p-4 text-white flex items-center justify-between shadow-sm z-10 border-b-4 border-black">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner border-2 border-green-600">
                WR
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight tracking-wide">West Rocks Assistant</h1>
                <p className="text-green-100 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span>
                  Online - Usually replies instantly
                </p>
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 text-sm md:text-base shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-green-800 text-white rounded-br-sm' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 text-slate-500 rounded-2xl rounded-bl-sm p-4 shadow-sm flex gap-1">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask a question about the school..."
                className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-green-800 focus:ring-2 focus:ring-green-200 rounded-xl px-4 py-3 outline-none transition-all duration-200"
              />
              <button 
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="bg-green-800 hover:bg-black disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl px-5 py-3 flex items-center justify-center transition-colors duration-200"
              >
                <Send size={20} className={inputText.trim() && !isTyping ? "translate-x-0.5" : ""} />
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-slate-400">AI assistants can make mistakes. Verify important dates with the official calendar.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
