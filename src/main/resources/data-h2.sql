insert into schedule_bid_group (id,bid_group_name, effective_from_date, location, description, job_type, calc_group, shift_type) values(1, 'ABQ-ABQ FT', CURRENT_TIMESTAMP, 'ABQ', 'ABQ-ABQ FT', 'Full Time','CS-FT', 'Morning');
insert into schedule_bid_group (id,bid_group_name, effective_from_date, location, description, job_type, calc_group, shift_type) values(2, 'BOS-BOS FT', CURRENT_TIMESTAMP, 'BOS', 'BOS-BOS FT', 'Full Time','CS-FT', 'Afternoon');

insert into schedule_bid_detail(bid_dtl_id,bid_group_id,bid_name,bid_desc,bid_start_date,bid_end_date,bid_reward_date,bid_paused_date,bid_type,job_type,window_length,status,open_time, airport_code, effective_date) values(1,1,'2017 ABQ-ABQ FT','2017 ABQ-ABQ FT',to_date('01-JAN-2017 11:00:00','dd-MON-yyyy HH:Mi:ss'),to_date('31-JAN-2017 15:00:00','dd-MON-yyyy HH:mi:ss'),to_date('01-JUN-2017','dd-MON-yyyy'),to_date('30-JUN-2017','dd-MON-yyyy'),'Live','FT',2,'Open', false, 'ABQ', to_date('01-JAN-2017','dd-MON-yyyy'));
insert into schedule_bid_detail(bid_dtl_id,bid_group_id,bid_name,bid_desc,bid_start_date,bid_end_date,bid_reward_date,bid_paused_date,bid_type,job_type,window_length,status,open_time, airport_code, effective_date) values(2,2,'2017 BOS-BOS FT','2017 BOS-BOS FT',to_date('01-JAN-2017 11:00:00','dd-MON-yyyy HH:Mi:ss'),to_date('31-JAN-2017 15:00:00','dd-MON-yyyy HH:mi:ss'),to_date('01-JUN-2017','dd-MON-yyyy'),to_date('30-JUN-2017','dd-MON-yyyy'),'Live','FT',2,'Open', false, 'BOS', to_date('01-JAN-2017','dd-MON-yyyy'));


insert into schedule_type (id,name, tag, tool_tip) values (1,'Regular', 'REG','');
insert into schedule_type (id,name, tag, tool_tip) values (2,'Variable', 'VAR','');
insert into schedule_type (id,name, tag, tool_tip) values (3,'Flex', 'FLEX','');
insert into schedule_type (id,name, tag, tool_tip) values (4,'Rotating', 'ROT','');

insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (1,1, 1, 1001, 'GT', 40);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (2,1, 1,1002, 'TC', 32);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours,tool_tip, flex_date) values (3,1, 3,1003, 'T6', 32,'Flex - 12-25-2017 (1100-2130)', to_date('12-25-2017','MM-dd-yyyy'));
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (4,1, 1,1004, 'T1', 40);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (5,1, 1,1005, 'T2', 32);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (6,1, 2,1006, 'T3', 40);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (7,1, 1,1007, 'T4', 32);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (8,1, 4,1008, 'T5', 40);

insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (9,2, 1, 2001, 'GT', 40);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours,tool_tip, flex_date) values (10,2, 3,2003, 'T6', 32,'Flex - 11-23-2017 (1100-2130)', to_date('11-23-2017','MM-dd-yyyy'));
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (11,2, 1,2002, 'TC', 32);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (12,2, 1,2004, 'T1', 40);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (13,2, 2,2005, 'T2', 32);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (14,2, 1,2006, 'T3', 40);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (15,2, 4,2007, 'T4', 32);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (16,2, 1,2008, 'T5', 40);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (17,2, 1,2009, 'T7', 32);
insert into schedule_line(id, bid_dtl_id, schedule_type_id,  line_id, label, hours) values (18,2, 1,2010, 'T8', 40);

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (1, 1, 1,'0800', '1700', 30, '',  'T2', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (2, 1, 2, '', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (3, 1, 3, '', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (4, 1, 4,'0800', '1700', 30, '', 'T2', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (5, 1, 5,'0800', '1700', 30, '', 'T2', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (6, 1, 6,'0800', '1700', 30, '', 'T2', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (7, 1, 7,'0800', '1700', 30, '', 'T2', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (8, 2, 1,'0600', '1200', 0, '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (9, 2, 2,'0600', '1200', 0, '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (10, 2, 3,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (11, 2, 4,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (12, 2, 5,'0600', '1200', 0,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (13, 2, 6,'0600', '1200', 0,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (14, 2, 7,'0600', '1200', 0,  '', 'T1', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (15, 3, 1,'1300', '2330', 60,  '', 'T4', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (16, 3, 2,'1300', '2330', 60,  '', 'T4', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (17, 3, 3,'1300', '2330', 60,  '', 'T4', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (18, 3, 4,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (19, 3, 5,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (20, 3, 6,'1300', '2330', 60,  '', 'T4', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (21, 3, 7,'1300', '2330', 60,  '', 'T4', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (71, 3, 1,'1100', '2130', 30, '', 'T4', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (72, 3, 2,'1100', '2130', 30, '', 'T4', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (73, 3, 3,'1100', '2130', 30, '', 'T4', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (74, 3, 4,'1100', '2130', 30, '', 'T4', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (75, 3, 5,'', '', 0, '', '', 'Y', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (76, 3, 6,'', '', 0,  '', '', 'Y', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (77, 3, 7,'1200', '2130', 30, '', 'T4', '', 'Y');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (22, 4, 1,'0930', '1600', 30,  '', 'T5', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (23, 4, 2,'0930', '1600', 30,  '', 'T5', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (24, 4, 3,'0930', '1600', 30,  '', 'T5', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (25, 4, 4,'0930', '1600', 30,  '', 'T5', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (26, 4, 5,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (27, 4, 6,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (28, 4, 7,'0930', '1600', 30,  '', 'T5', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (29, 5, 1,'1930', '2359', 30,  '', 'T3', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (30, 5, 2,'1930', '2359', 30,  '', 'T3', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (31, 5, 3,'1930', '2359', 30,  '', 'T3', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (32, 5, 4,'1930', '2359', 30,  '', 'T3', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (33, 5, 5,'1930', '2359', 30,  '', 'T3', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (34, 5, 6,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (35, 5, 7,'', '', 0, '', '', 'Y');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (36, 6, 1,'0830', '1500', 30,  '', 'TC', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (37, 6, 2,'0930', '1600', 30,  '', 'TC', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (38, 6, 3,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (39, 6, 4,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (40, 6, 5,'0730', '1400', 30,  '', 'TC', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (41, 6, 6,'1000', '1730', 30,  '', 'TC', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (42, 6, 7,'0630', '1300', 30,  '', 'TC', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (43, 7, 1,'1700', '2359', 30,  '', 'GT', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (44, 7, 2,'1700', '2359', 30,  '', 'GT', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (45, 7, 3,'1700', '2359', 30,  '', 'GT', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (46, 7, 4,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (47, 7, 5,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (48, 7, 6,'1700', '2359', 30,  '', 'GT', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (49, 7, 7,'1700', '2359', 30,  '', 'GT', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (50, 8, 1,'0930', '1600', 30,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (51, 8, 2,'0930', '1600', 30,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (52, 8, 3,'0930', '1600', 30,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (53, 8, 4,'0930', '1600', 30,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (54, 8, 5,'0930', '1600', 30,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (55, 8, 6,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (56, 8, 7,'', '', 0, '', '', 'Y');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (57, 8, 1,'1700', '2359', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (58, 8, 2,'1700', '2359', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (59, 8, 3,'1700', '2359', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (60, 8, 4,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (61, 8, 5,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (62, 8, 6,'1700', '2359', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (63, 8, 7,'1700', '2359', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (64, 8, 1,'1300', '2330', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (65, 8, 2,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (66, 8, 3,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (67, 8, 4,'1300', '2330', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (68, 8, 5,'1300', '2330', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (69, 8, 6,'1300', '2330', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (70, 8, 7,'1300', '2330', 30,  '', 'T6', 'N');


insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (78, 8, 1,'0600', '1200', 0, '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (79, 8, 2,'0600', '1200', 0, '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (80, 8, 3,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (81, 8, 4,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (82, 8, 5,'0600', '1200', 0,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (83, 8, 6,'0600', '1200', 0,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (84, 8, 7,'0600', '1200', 0,  '', 'T1', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (92, 9, 2, '', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (93, 9, 3, '', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (94, 9, 4,'0800', '1700', 30, '', 'T2', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (95, 9, 5,'0800', '1700', 30, '', 'T2', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (96, 9, 6,'0800', '1700', 30, '', 'T2', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (97, 9, 7,'0800', '1700', 30, '', 'T2', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (98, 9, 1,'0800', '1700', 30, '',  'T2', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (85, 10, 1,'1300', '2330', 60,  '', 'T4', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (86, 10, 2,'1300', '2330', 60,  '', 'T4', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (87, 10, 3,'1300', '2330', 60,  '', 'T4', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (88, 10, 4,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (89, 10, 5,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (90, 10, 6,'1300', '2330', 60,  '', 'T4', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (91, 10, 7,'1300', '2330', 60,  '', 'T4', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (99, 10, 1,'1100', '2130', 30, '', 'T4', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (105, 10, 2,'1100', '2130', 30, '', 'T4', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (100, 10, 3,'1100', '2130', 30, '', 'T4', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (101, 10, 4,'1100', '2130', 30, '', 'T4', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (102, 10, 5,'1100', '2130', 30, '', 'T4', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (103, 10, 6,'', '', 0, '', '', 'Y', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day, flex_day) values (104, 10, 7,'', '', 0, '', '', 'Y', 'Y');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (108, 11, 1,'0930', '1600', 30,  '', 'T5', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (109, 11, 2,'0930', '1600', 30,  '', 'T5', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (110, 11, 3,'0930', '1600', 30,  '', 'T5', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (111, 11, 4,'0930', '1600', 30,  '', 'T5', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (112, 11, 5,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (113, 11, 6,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (114, 11, 7,'0930', '1600', 30,  '', 'T5', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (115, 12, 1,'1930', '2359', 30,  '', 'T3', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (116, 12, 2,'1930', '2359', 30,  '', 'T3', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (117, 12, 3,'1930', '2359', 30,  '', 'T3', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (118, 12, 4,'1930', '2359', 30,  '', 'T3', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (119, 12, 5,'1930', '2359', 30,  '', 'T3', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (120, 12, 6,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (121, 12, 7,'', '', 0, '', '', 'Y');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (122, 13, 1,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (123, 13, 2,'0930', '1600', 30,  '', 'TC', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (124, 13, 3,'0730', '1400', 30,  '', 'TC', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (125, 13, 4,'1000', '1730', 30,  '', 'TC', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (126, 13, 5,'0630', '1300', 30,  '', 'TC', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (127, 13, 6,'1130', '1800', 30,  '', 'TC', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (128, 13, 7,'', '', 0, '', '', 'Y');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (129, 14, 1,'1700', '2359', 30,  '', 'GT', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (130, 14, 2,'1700', '2359', 30,  '', 'GT', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (131, 14, 3,'1700', '2359', 30,  '', 'GT', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (132, 14, 4,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (133, 14, 5,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (134, 14, 6,'1700', '2359', 30,  '', 'GT', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (135, 14, 7,'1700', '2359', 30,  '', 'GT', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (136, 15, 1,'0930', '1600', 30,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (137, 15, 2,'0930', '1600', 30,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (138, 15, 3,'0930', '1600', 30,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (139, 15, 4,'0930', '1600', 30,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (140, 15, 5,'0930', '1600', 30,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (141, 15, 6,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (142, 15, 7,'', '', 0, '', '', 'Y');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (143, 15, 1,'1700', '2359', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (144, 15, 2,'1700', '2359', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (145, 15, 3,'1700', '2359', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (146, 15, 4,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (147, 15, 5,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (148, 15, 6,'1700', '2359', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (149, 15, 7,'1700', '2359', 30,  '', 'T6', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (150, 15, 1,'1300', '2330', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (151, 15, 2,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (152, 15, 3,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (153, 15, 4,'1300', '2330', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (154, 15, 5,'1300', '2330', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (155, 15, 6,'1300', '2330', 30,  '', 'T6', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (156, 15, 7,'1300', '2330', 30,  '', 'T6', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (157, 16, 1,'0600', '1200', 0, '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (158, 16, 2,'0600', '1200', 0, '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (159, 16, 3,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (160, 16, 4,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (161, 16, 5,'0600', '1200', 0,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (162, 16, 6,'0600', '1200', 0,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (163, 16, 7,'0600', '1200', 0,  '', 'T1', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (164, 17, 1,'0600', '1200', 0, '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (165, 17, 2,'0600', '1200', 0, '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (166, 17, 3,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (167, 17, 4,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (168, 17, 5,'0600', '1200', 0,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (169, 17, 6,'0600', '1200', 0,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (170, 17, 7,'0600', '1200', 0,  '', 'T1', 'N');

insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (171, 18, 1,'0600', '1200', 0, '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (172, 18, 2,'0600', '1200', 0, '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (173, 18, 3,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (174, 18, 4,'', '', 0, '', '', 'Y');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (175, 18, 5,'0600', '1200', 0,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (176, 18, 6,'0600', '1200', 0,  '', 'T1', 'N');
insert into schedule_line_detail(id, schedule_line_id, day_of_week, start_time, end_time, break_time, skills, location, off_day ) values (177, 18, 7,'0600', '1200', 0,  '', 'T1', 'N');


insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (1,1,10001,'Week1','01-02-2017','01-08-2017',2);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (2,1,10002,'Week2','01-09-2017','01-15-2017',7);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (3,1,10003,'Week3','01-16-2017','01-22-2017',3);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (4,1,10004,'Week4','01-23-2017','01-29-2017',6);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (5,1,10005,'Week5','01-30-2017','02-05-2017',5);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (6,1,10006,'Week6','02-06-2017','02-12-2017',8);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (7,1,10007,'Week7','02-13-2017','02-19-2017',9);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (8,1,10008,'Week8','02-20-2017','02-26-2017',4);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (9,1,10009,'Week9','02-27-2017','03-05-2017',5);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (10,1,10010,'Week10','03-06-2017','03-12-2017',7);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (11,1,10011,'Week11','03-13-2017','03-19-2017',8);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (12,1,10012,'Week12','03-20-2017','03-26-2017',9);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (13,1,10013,'Week13','03-27-2017','04-02-2017',2);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (14,1,10014,'Week14','04-03-2017','04-09-2017',7);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (15,1,10015,'Week15','04-10-2017','04-16-2017',3);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (16,1,10016,'Week16','04-17-2017','04-23-2017',6);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (17,1,10017,'Week17','04-24-2017','04-30-2017',5);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (18,1,10018,'Week18','05-01-2017','05-07-2017',8);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (19,1,10019,'Week19','05-08-2017','05-14-2017',9);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (20,1,10020,'Week20','05-15-2017','05-21-2017',4);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (21,1,10021,'Week21','05-22-2017','05-28-2017',5);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (22,1,10022,'Week22','05-29-2017','06-04-2017',7);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (23,1,10023,'Week23','06-05-2017','06-11-2017',8);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (24,1,10024,'Week24','06-12-2017','06-18-2017',9);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (25,1,10025,'Week25','06-19-2017','06-25-2017',2);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (26,1,10026,'Week26','06-26-2017','07-02-2017',7);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (27,1,10027,'Week27','07-03-2017','07-09-2017',3);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (28,1,10028,'Week28','07-10-2017','07-16-2017',6);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (29,1,10029,'Week29','07-17-2017','07-23-2017',5);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (30,1,10030,'Week30','07-24-2017','07-30-2017',8);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (31,1,10031,'Week31','07-31-2017','08-06-2017',9);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (32,1,10032,'Week32','08-07-2017','08-13-2017',4);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (33,1,10033,'Week33','08-14-2017','08-20-2017',5);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (34,1,10034,'Week34','08-21-2017','08-27-2017',7);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (35,1,10035,'Week35','08-28-2017','09-03-2017',8);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (36,1,10036,'Week36','09-04-2017','09-10-2017',9);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (37,1,10037,'Week37','09-11-2017','09-17-2017',2);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (38,1,10038,'Week38','09-18-2017','09-24-2017',7);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (39,1,10039,'Week39','09-25-2017','10-01-2017',3);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (40,1,10040,'Week40','10-02-2017','10-08-2017',6);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (41,1,10041,'Week41','10-09-2017','10-15-2017',5);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (42,1,10042,'Week42','10-16-2017','10-22-2017',8);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (43,1,10043,'Week43','10-23-2017','10-29-2017',9);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (44,1,10044,'Week44','10-30-2017','11-05-2017',4);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (45,1,10045,'Week45','11-06-2017','11-12-2017',5);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (46,1,10046,'Week46','11-13-2017','11-19-2017',7);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (47,1,10047,'Week47','11-20-2017','11-26-2017',8);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (48,1,10048,'Week48','11-27-2017','12-03-2017',9);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (49,1,10049,'Week49','12-04-2017','12-10-2017',6);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (50,1,10050,'Week50','12-11-2017','12-17-2017',2);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (51,1,10051,'Week51','12-18-2017','12-24-2017',4);
insert into vacation_week(id, bid_group_id, vacation_num, week_description, start_date, end_date, total_slots) values (52,1,10052,'Week52','12-25-2017','12-31-2017',3);

insert into vacation(id) values (1);
insert into vacation(id) values (2);
insert into role(id) values (1);
insert into vacation_re_award (id,vacation_id,requested_week,existing_week) values (1,1,6,10);
insert into vacation_re_award (id,vacation_id,requested_week,existing_week) values (2,2,12,34);
insert into contact_info(id, primary_mobile_no, secondary_mobile_no, primary_email, secondary_email, role_id) values (1,'948574353','874653538','test@xyz.com','test1@xyz.com',1);

insert into vacation_bid_detail(bid_dtl_id,bid_grp_name,bid_grp_id,bid_name,bid_desc,start_date,end_date,bid_start_date,bid_end_date,bid_reward_date,bid_paused_date,bid_type,shift_type,window_length,rounds,status) values(1,'ABQ-ABQ FT',1,'2017 ABQ-ABQ FT','2017 ABQ-ABQ FT',to_date('01-JAN-2017','dd-MON-yyyy'),to_date('31-DEC-2017','dd-MON-yyyy'),to_date('01-JUN-2017','dd-MON-yyyy'),to_date('30-JUN-2017','dd-MON-yyyy'),null,null,'Live','Morning',2,2,'Open');
insert into vacation_bid_detail(bid_dtl_id,bid_grp_name,bid_grp_id,bid_name,bid_desc,start_date,end_date,bid_start_date,bid_end_date,bid_reward_date,bid_paused_date,bid_type,shift_type,window_length,rounds,status) values(2,'BOS-BOS FT',2,'2017 BOS-BOS FT','2017 BOS-BOS FT',to_date('01-JAN-2017','dd-MON-yyyy'),to_date('31-DEC-2017','dd-MON-yyyy'),to_date('01-MAY-2017','dd-MON-yyyy'),to_date('31-MAY-2017','dd-MON-yyyy'),null,null,'Proxy','Evening',5,1,'Open');

insert into airport_details (id,code,start_date,end_date) values (1,'ABQ',to_date('06-20-2017','MM-dd-yyyy'),to_date('07-05-2017','MM-dd-yyyy'));
insert into airport_details (id,code,start_date,end_date) values (2,'BOS',to_date('06-01-2017','MM-dd-yyyy'),to_date('07-01-2017','MM-dd-yyyy'));

insert into vb_weekly_allotment(week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (1, 1, to_date('01-02-2017','MM-dd-yyyy'), to_date('01-08-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment(week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (2, 1, to_date('01-09-2017','MM-dd-yyyy'), to_date('01-15-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (3, 1, to_date('01-16-2017','MM-dd-yyyy'), to_date('01-22-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (4, 1, to_date('01-23-2017','MM-dd-yyyy'), to_date('01-29-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (5, 1, to_date('01-30-2017','MM-dd-yyyy'), to_date('02-05-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (6, 1, to_date('02-06-2017','MM-dd-yyyy'), to_date('02-12-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (7, 1, to_date('02-13-2017','MM-dd-yyyy'), to_date('02-19-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (8, 1, to_date('02-20-2017','MM-dd-yyyy'), to_date('02-26-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (9, 1, to_date('02-27-2017','MM-dd-yyyy'), to_date('03-05-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (10, 1, to_date('03-06-2017','MM-dd-yyyy'), to_date('03-12-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (11, 1, to_date('03-13-2017','MM-dd-yyyy'), to_date('03-19-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (12, 1, to_date('03-20-2017','MM-dd-yyyy'), to_date('03-26-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (13, 1, to_date('03-27-2017','MM-dd-yyyy'), to_date('04-02-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (14, 1, to_date('04-03-2017','MM-dd-yyyy'), to_date('04-09-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (15, 1, to_date('04-10-2017','MM-dd-yyyy'), to_date('04-16-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (16, 1, to_date('04-17-2017','MM-dd-yyyy'), to_date('04-23-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (17, 1, to_date('04-24-2017','MM-dd-yyyy'), to_date('04-30-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (18, 1, to_date('05-01-2017','MM-dd-yyyy'), to_date('05-07-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (19, 1, to_date('05-08-2017','MM-dd-yyyy'), to_date('05-14-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (20, 1, to_date('05-15-2017','MM-dd-yyyy'), to_date('05-21-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment(week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (21, 1, to_date('05-22-2017','MM-dd-yyyy'), to_date('05-28-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment(week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (22, 1, to_date('05-29-2017','MM-dd-yyyy'), to_date('06-04-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (23, 1, to_date('06-05-2017','MM-dd-yyyy'), to_date('06-11-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (24, 1, to_date('06-12-2017','MM-dd-yyyy'), to_date('06-18-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (25, 1, to_date('06-19-2017','MM-dd-yyyy'), to_date('06-25-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (26, 1, to_date('06-26-2017','MM-dd-yyyy'), to_date('07-02-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (27, 1, to_date('07-03-2017','MM-dd-yyyy'), to_date('07-09-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (28, 1, to_date('07-10-2017','MM-dd-yyyy'), to_date('07-16-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (29, 1, to_date('07-17-2017','MM-dd-yyyy'), to_date('07-23-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (30, 1, to_date('07-24-2017','MM-dd-yyyy'), to_date('07-30-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (31, 1, to_date('07-31-2017','MM-dd-yyyy'), to_date('08-06-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (32, 1, to_date('08-07-2017','MM-dd-yyyy'), to_date('08-13-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (33, 1, to_date('08-14-2017','MM-dd-yyyy'), to_date('08-20-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (34, 1, to_date('08-21-2017','MM-dd-yyyy'), to_date('08-27-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (35, 1, to_date('08-28-2017','MM-dd-yyyy'), to_date('09-03-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (36, 1, to_date('09-04-2017','MM-dd-yyyy'), to_date('09-10-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (37, 1, to_date('09-11-2017','MM-dd-yyyy'), to_date('09-17-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (38, 1, to_date('09-18-2017','MM-dd-yyyy'), to_date('09-25-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (39, 1, to_date('09-25-2017','MM-dd-yyyy'), to_date('10-01-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (40, 1, to_date('10-02-2017','MM-dd-yyyy'), to_date('10-08-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment(week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (41, 1, to_date('10-09-2017','MM-dd-yyyy'), to_date('10-15-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment(week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (42, 1, to_date('10-16-2017','MM-dd-yyyy'), to_date('10-22-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (43, 1, to_date('10-23-2017','MM-dd-yyyy'), to_date('10-29-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (44, 1, to_date('10-30-2017','MM-dd-yyyy'), to_date('11-05-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (45, 1, to_date('11-06-2017','MM-dd-yyyy'), to_date('11-12-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (46, 1, to_date('11-13-2017','MM-dd-yyyy'), to_date('11-19-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (47, 1, to_date('11-20-2017','MM-dd-yyyy'), to_date('11-26-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (48, 1, to_date('11-27-2017','MM-dd-yyyy'), to_date('12-03-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (49, 1, to_date('12-04-2017','MM-dd-yyyy'), to_date('12-10-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (50, 1, to_date('12-11-2017','MM-dd-yyyy'), to_date('12-17-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (51, 1, to_date('12-18-2017','MM-dd-yyyy'), to_date('12-24-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (52, 1, to_date('12-25-2017','MM-dd-yyyy'), to_date('12-31-2017','MM-dd-yyyy'), 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);

insert into vb_weekly_allotment(week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (1, 2, to_date('01-02-2017','MM-dd-yyyy'), to_date('01-08-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment(week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (2, 2, to_date('01-09-2017','MM-dd-yyyy'), to_date('01-15-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (3, 2, to_date('01-16-2017','MM-dd-yyyy'), to_date('01-22-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (4, 2, to_date('01-23-2017','MM-dd-yyyy'), to_date('01-29-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (5, 2, to_date('01-30-2017','MM-dd-yyyy'), to_date('02-05-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (6, 2, to_date('02-06-2017','MM-dd-yyyy'), to_date('02-12-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (7, 2, to_date('02-13-2017','MM-dd-yyyy'), to_date('02-19-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (8, 2, to_date('02-20-2017','MM-dd-yyyy'), to_date('02-26-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (9, 2, to_date('02-27-2017','MM-dd-yyyy'), to_date('03-05-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (10, 2, to_date('03-06-2017','MM-dd-yyyy'), to_date('03-12-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (11, 2, to_date('03-13-2017','MM-dd-yyyy'), to_date('03-19-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (12, 2, to_date('03-20-2017','MM-dd-yyyy'), to_date('03-26-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (13, 2, to_date('03-27-2017','MM-dd-yyyy'), to_date('04-02-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (14, 2, to_date('04-03-2017','MM-dd-yyyy'), to_date('04-09-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (15, 2, to_date('04-10-2017','MM-dd-yyyy'), to_date('04-16-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (16, 2, to_date('04-17-2017','MM-dd-yyyy'), to_date('04-23-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (17, 2, to_date('04-24-2017','MM-dd-yyyy'), to_date('04-30-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (18, 2, to_date('05-01-2017','MM-dd-yyyy'), to_date('05-07-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (19, 2, to_date('05-08-2017','MM-dd-yyyy'), to_date('05-14-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (20, 2, to_date('05-15-2017','MM-dd-yyyy'), to_date('05-21-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment(week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (21, 2, to_date('05-22-2017','MM-dd-yyyy'), to_date('05-28-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment(week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (22, 2, to_date('05-29-2017','MM-dd-yyyy'), to_date('06-04-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (23, 2, to_date('06-05-2017','MM-dd-yyyy'), to_date('06-11-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (24, 2, to_date('06-12-2017','MM-dd-yyyy'), to_date('06-18-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (25, 2, to_date('06-19-2017','MM-dd-yyyy'), to_date('06-25-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (26, 2, to_date('06-26-2017','MM-dd-yyyy'), to_date('07-02-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (27, 2, to_date('07-03-2017','MM-dd-yyyy'), to_date('07-09-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (28, 2, to_date('07-10-2017','MM-dd-yyyy'), to_date('07-16-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (29, 2, to_date('07-17-2017','MM-dd-yyyy'), to_date('07-23-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (30, 2, to_date('07-24-2017','MM-dd-yyyy'), to_date('07-30-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (31, 2, to_date('07-31-2017','MM-dd-yyyy'), to_date('08-06-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (32, 2, to_date('08-07-2017','MM-dd-yyyy'), to_date('08-13-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (33, 2, to_date('08-14-2017','MM-dd-yyyy'), to_date('08-20-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (34, 2, to_date('08-21-2017','MM-dd-yyyy'), to_date('08-27-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (35, 2, to_date('08-28-2017','MM-dd-yyyy'), to_date('09-03-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (36, 2, to_date('09-04-2017','MM-dd-yyyy'), to_date('09-10-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (37, 2, to_date('09-11-2017','MM-dd-yyyy'), to_date('09-17-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (38, 2, to_date('09-18-2017','MM-dd-yyyy'), to_date('09-25-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (39, 2, to_date('09-25-2017','MM-dd-yyyy'), to_date('10-01-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (40, 2, to_date('10-02-2017','MM-dd-yyyy'), to_date('10-08-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment(week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (41, 2, to_date('10-09-2017','MM-dd-yyyy'), to_date('10-15-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment(week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (42, 2, to_date('10-16-2017','MM-dd-yyyy'), to_date('10-22-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (43, 2, to_date('10-23-2017','MM-dd-yyyy'), to_date('10-29-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (44, 2, to_date('10-30-2017','MM-dd-yyyy'), to_date('11-05-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (45, 2, to_date('11-06-2017','MM-dd-yyyy'), to_date('11-12-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (46, 2, to_date('11-13-2017','MM-dd-yyyy'), to_date('11-19-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (47, 2, to_date('11-20-2017','MM-dd-yyyy'), to_date('11-26-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (48, 2, to_date('11-27-2017','MM-dd-yyyy'), to_date('12-03-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (49, 2, to_date('12-04-2017','MM-dd-yyyy'), to_date('12-10-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (50, 2, to_date('12-11-2017','MM-dd-yyyy'), to_date('12-17-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (51, 2, to_date('12-18-2017','MM-dd-yyyy'), to_date('12-24-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
insert into vb_weekly_allotment( week_number,bid_dtl_id,start_date,end_date,slots_available,slots_remaining,slots_available_mon,slots_remaining_mon,slots_available_tue,slots_remaining_tue,slots_available_wed,slots_remaining_wed,slots_available_thu,slots_remaining_thu,slots_available_fri,slots_remaining_fri,slots_available_sat,slots_remaining_sat,slots_available_sun,slots_remaining_sun)
values (52, 2, to_date('12-25-2017','MM-dd-yyyy'), to_date('12-31-2017','MM-dd-yyyy'), 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);

insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (1,1,'A111111','John','Smith','06-20-1985','1','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','admin','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (2,2,'A999999','Emily','Cobb','06-25-1982','2','active','def','rst','gfh','den','4567895678','5674563453','fgj@gmail.com','dxfhfh@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (3,3,'A123456','Ryan','Buddy','03-02-1975','3','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (4,4,'A234567','Dan','Butler','06-11-1986','4','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (5,5,'A345678','Paul','Walker','01-06-1979','5','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (6,6,'A456789','Mary','Stark','05-04-1978','6','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (7,7,'A567890','David','Hufler','08-04-1985','7','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (8,8,'A678901','Will','Parker','03-07-1988','8','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (9,9,'A789012','Celia','Jones','04-15-1972','9','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (10,10,'A890123','Shane','Brooks','08-09-1977','10','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (11,11,'A629341','Davis','Smith','06-20-1985','1','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (12,12,'A245082','Dan','Hawkins','06-25-1982','12','active','def','rst','gfh','den','4567895678','5674563453','fgj@gmail.com','dxfhfh@gmail.com','admin','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (13,13,'A123453','Jane','Scott','03-02-1975','13','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (14,14,'A234564','Dane','Butler','06-11-1986','14','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (15,15,'A345675','Paul','Hufler','01-06-1979','15','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (16,16,'A456786','Mary','Walker','05-04-1978','16','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (17,17,'A567897','John','Stark','08-04-1985','17','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (18,18,'A678908','Will','Brooks','03-07-1988','18','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (19,19,'A789018','Celia','Parker','04-15-1972','19','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (20,20,'A890110','Martha','Jones','08-09-1977','20','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (21,21,'A211111','Oscar','Smith','06-20-1985','21','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (22,22,'A111112','Ben','Hawkins','06-25-1982','22','active','def','rst','gfh','den','4567895678','5674563453','fgj@gmail.com','dxfhfh@gmail.com','admin','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (23,23,'A111113','Sean','Scott','03-02-1975','23','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (24,24,'A111114','Stacy','Butler','06-11-1986','24','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (25,25,'A111115','Dana','Hufler','01-06-1979','25','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (26,26,'A111116','Judy','Walker','05-04-1978','26','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (27,27,'A111117','James','Stark','08-04-1985','27','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (28,28,'A111118','Amelia','Brooks','03-07-1988','28','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (29,29,'A111119','Jonathan','Parker','04-15-1972','29','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');
insert into emp_info (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,password) 
values (30,30,'A111110','Kevin','Jones','08-09-1977','30','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','1');

insert into SCHEDULE_BID_GROUP_EMPLIST values(1,1,1,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(2,2,1,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(3,3,1,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(4,4,1,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(5,5,1,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(6,6,1,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(7,7,1,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(8,8,1,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(9,9,2,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(10,10,2,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);

insert into SCHEDULE_BID_GROUP_EMPLIST values(11,11,2,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(12,12,2,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(13,13,2,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(14,14,2,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(15,15,2,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(16,16,2,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(17,17,2,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);
insert into SCHEDULE_BID_GROUP_EMPLIST values(18,20,2,to_date('2017-10-01','YYYY-MM-DD'),to_date('2017-10-31','YYYY-MM-DD'),null,null);

insert into vacation_bidding_criteria (bidding_id,vacationdetails,select_value,select_option) values (1,'I Want','weeks','5');
insert into vacation_bidding_criteria (bidding_id,vacationdetails,select_value,select_option) values (2,'I do not Want','Months','Jan');

insert into VB_EMP_PREFERENCE_ASSIGNMENT values
(1,0,1,6,0,1,to_date('2017-02-06','yyyy-mm-dd'),'2017-02-10 23:59:59.999',1,'John Smith','VAC',0,null,TRUE,FALSE);
insert into VB_EMP_PREFERENCE_ASSIGNMENT values
(2,0,1,10,0,2,to_date('2017-03-06','yyyy-mm-dd'),'2017-03-10 23:59:59.999',1,'John Smith','HOL-VAC',0,null,TRUE,FALSE);


insert into VB_EMP_PREFERENCE_ASSIGNMENT values
(6,0,2,7,0,1,to_date('2017-02-12','yyyy-mm-dd'),'2017-02-16 23:59:59.999',1,'John Smith','VAC',0,null,TRUE,FALSE);
insert into VB_EMP_PREFERENCE_ASSIGNMENT values
(7,0,2,15,0,2,to_date('2017-04-11','yyyy-mm-dd'),'2017-04-15 23:59:59.999',1,'John Smith','HOL-VAC',0,null,TRUE,FALSE);

--insert into SCHEDULE_LINE_ASSIGNMENT  values(1,1,1,to_date('2017-10-31','yyyy-mm-dd'),'John Smith', 0,	FALSE,	FALSE);
--insert into SCHEDULE_LINE_ASSIGNMENT  values(2,6,3,to_date('2017-10-31','yyyy-mm-dd'),'Mary Stark', 0,	FALSE,	FALSE);
--insert into SCHEDULE_LINE_ASSIGNMENT  values(3,3,5,to_date('2017-10-31','yyyy-mm-dd'),'Dane Scott', 0,	FALSE,	FALSE);
insert into SCHEDULE_LINE_ASSIGNMENT  values(1,4,12,to_date('2017-10-31','yyyy-mm-dd'),'Dan Butler', 0,	FALSE,	FALSE);
insert into SCHEDULE_LINE_ASSIGNMENT  values(2,5,16,to_date('2017-10-31','yyyy-mm-dd'),'Paul Walker', 0,	FALSE,	FALSE);
--
insert into SCHEDULE_LINE_ASSIGNMENT  values(3,3,2,to_date('2017-10-31','yyyy-mm-dd'),'Ryan Buddy', 1,	TRUE,	FALSE);
insert into SCHEDULE_LINE_ASSIGNMENT  values(4,3,5,to_date('2017-10-31','yyyy-mm-dd'),'Ryan Buddy', 2,	TRUE,	FALSE);
--insert into SCHEDULE_LINE_ASSIGNMENT  values(8,10,16,to_date('2017-10-31','yyyy-mm-dd'),'Shane Brooks', 0,	FALSE,	FALSE);
--insert into SCHEDULE_LINE_ASSIGNMENT  values(9,11,14,to_date('2017-10-31','yyyy-mm-dd'),'Davis Smith', 0,	FALSE,	FALSE);
--insert into SCHEDULE_LINE_ASSIGNMENT  values(10,12,18,to_date('2017-10-31','yyyy-mm-dd'),'Dan Hawkins', 0,	FALSE,	FALSE);


insert into buddy_request values(1,'A123456','A999999',3,2,'You have a Buddy request from :A123456','ACCEPTED');
--insert into buddy_request (id,from_employee_aaid,to_employee_aaid,from_employee_empid,to_employee_empid,message,status) 
--values (2,'A999999','A123456',1,3,'You have a Buddy request from A111111','ACCEPTED');

--insert into schedule_bid_group_emplist (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,buddy_status,start_date,end_date) 
--values (1,1,'A629348','John','Smith','06-20-2017','234','active','abc','xyz','gfh','den','4578376388','2345673456','abc@gmail.com','test@gmail.com','user','0','2015-09-09','2017-09-08');
--insert into schedule_bid_group_emplist (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,buddy_status,start_date,end_date) 
--values (2,2,'A245086','Jane','Hawkins','06-25-2017','235','active','def','rst','gfh','den','4567895678','5674563453','fgj@gmail.com','dxfhfh@gmail.com','admin','0','2016-07-09','2017-02-10');
--insert into schedule_bid_group_emplist (id,emp_id,aaid,first_name,last_name,dob,seniority,status,employee_team,calc_group,pay_group,airport,primary_mobile_no,secondary_mobile_no,primary_email,secondary_email,role,buddy_status,start_date,end_date) 
--values (3,3,'A456798','Abbot','Brook','06-30-2017','236','active','gjk','jdk','ksa','bos','5674565679','3456345478','honey@gmail.com','bljc@gmail.com','user','0','2014-09-09','2017-09-18');


commit;
