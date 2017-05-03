CREATE SCHEMA `cmpe281-umlparser` ;

# Tenant Table
CREATE TABLE `cmpe281-umlparser`.`Tenants` (
  `tenant_id` INT NOT NULL AUTO_INCREMENT,
  `tenant_name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `table_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tenant_id`),
  UNIQUE INDEX `tenant_id_UNIQUE` (`tenant_id` ASC));

## Insert Stetements for Tenant Table
INSERT INTO `cmpe281-umlparser`.`Tenants` (`tenant_name`, `username`, `password`, `table_name`) VALUES ('Aniruddha Pratap Singh', 'aniruddha', 'aniruddha', 'Tenant1-Grade');
INSERT INTO `cmpe281-umlparser`.`Tenants` (`tenant_name`, `username`, `password`, `table_name`) VALUES ('Kunal Ahuja', 'kunal', 'kunal', 'Tenant2-Grade');
INSERT INTO `cmpe281-umlparser`.`Tenants` (`tenant_name`, `username`, `password`, `table_name`) VALUES ('Meenakshi Paryani', 'meenakshi', 'meenakshi', 'Tenant3-Grade');
INSERT INTO `cmpe281-umlparser`.`Tenants` (`tenant_name`, `username`, `password`, `table_name`) VALUES ('Vivek Agarwal', 'vivek', 'vivek', 'Tenant4-Grade');


# Tenant1 Table for Aniruddha Pratap Singh
  CREATE TABLE `cmpe281-umlparser`.`Tenant1-Grade` (
  `tenant1_id` INT NOT NULL,
  `result` BIT(1) NULL,
  PRIMARY KEY (`tenant_id`),
  CONSTRAINT `tenant_id`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `cmpe281-umlparser`.`Tenants` (`tenant_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

# Tenant2 Table for Kunal Ahuja
CREATE TABLE `cmpe281-umlparser`.`Tenant2-Grade` (
  `tenant_id` INT NOT NULL,
  `result` ENUM('A', 'B', 'C', 'D') NULL,
  PRIMARY KEY (`tenant_id`),
  CONSTRAINT `tenant2_id`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `cmpe281-umlparser`.`Tenants` (`tenant_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

# Tenant3 Table for Meenakshi Paryani
CREATE TABLE `cmpe281-umlparser`.`Tenant3-Grade` (
  `tenant_id` INT NOT NULL,
  `result` INT NULL,
  PRIMARY KEY (`tenant_id`),
  CONSTRAINT `tenant3_id`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `cmpe281-umlparser`.`Tenants` (`tenant_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

# Tenant4 Table for Vivek Agarwal

CREATE TABLE `cmpe281-umlparser`.`Tenant4-Grade` (
  `tenant_id` INT NOT NULL,
  `result` VARCHAR(45) NULL,
  INDEX `tenant_id_idx` (`tenant_id` ASC),
  CONSTRAINT `tenant4_id`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `cmpe281-umlparser`.`Tenants` (`tenant_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
