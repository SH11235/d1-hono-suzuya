CREATE TABLE `item` (
	`id` text PRIMARY KEY NOT NULL,
	`title_id` text NOT NULL,
	`name` text NOT NULL,
	`product_code` text,
	`sku` integer,
	`item_status` text NOT NULL,
	`pic_item_id` text,
	`maker_id` text,
	`retail_price` integer,
	`deleted` integer NOT NULL,
	`resubmission` integer NOT NULL,
	`line` text NOT NULL,
	`rough_coordinator_id` text,
	`rough_check_person_id` text,
	`line_art_coordinator_id` text,
	`line_art_check_person_id` text,
	`coloring_coordinator_id` text,
	`coloring_check_person_id` text,
	`design_coordinator_id` text,
	`design_check_person_id` text,
	`submission_data_coordinator_id` text,
	`submission_data_check_person_id` text,
	`announcement_materials_coordinator_id` text,
	`announcement_materials_check_person_id` text,
	`jan_coordinator_id` text,
	`jan_check_person_id` text,
	FOREIGN KEY (`title_id`) REFERENCES `title`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`pic_item_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`maker_id`) REFERENCES `maker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`rough_coordinator_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`rough_check_person_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`line_art_coordinator_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`line_art_check_person_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`coloring_coordinator_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`coloring_check_person_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`design_coordinator_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`design_check_person_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`submission_data_coordinator_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`submission_data_check_person_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`announcement_materials_coordinator_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`announcement_materials_check_person_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`jan_coordinator_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`jan_check_person_id`) REFERENCES `worker`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `maker` (
	`id` text PRIMARY KEY NOT NULL,
	`code_name` text NOT NULL,
	`deleted` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `title` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`release_date` text,
	`reservation_start_date` text,
	`reservation_deadline` text,
	`order_date_to_maker` text,
	`project_type` text NOT NULL,
	`catalog_status` text NOT NULL,
	`announcement_status` text NOT NULL,
	`remarks` text,
	`deleted` integer NOT NULL,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`delivery_date` text,
	`list_submission_date` text
);
--> statement-breakpoint
CREATE TABLE `worker` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`deleted` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `maker_code_name_unique` ON `maker` (`code_name`);