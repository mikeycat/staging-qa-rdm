# RDM Automation Framework

## Model Tables

### Browser
This will store all browsers that are to be tested against.

| Column | Data Type   | Constraints           |
| ------ | ----------- | --------------------- |
| id     | Integer     | Not Null, Primary Key |
| name   | varchar(45) | Not Null, Unique      |
| value  | varchar(10) | Not Null, Unique      |

```sql
CREATE TABLE
IF NOT EXISTS
  endtest.browsers (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    value varchar(10) NOT NULL, 
    PRIMARY KEY(id)
  )
;
```

### Operating System
This will store all operating systems that are to be tested against.

| Column         | Data Type   | Constraints           |
| -------------- | ----------- | --------------------- |
| id             | Integer     | Not Null, Primary Key |
| name           | varchar(45) | Not Null, Unique      |
| value          | varchar(10) | Not Null, Unique      |
| platform_value | varchar(1)  | Not Null              |

```sql
CREATE TABLE
IF NOT EXISTS
  endtest.os (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    value varchar(1) NOT NULL,
    PRIMARY KEY(id)
  )
;
```

### Active Tests
This will store all active endtest tests.

| Column        | Data Type    | Constraints           |
| ------------- | ------------ | --------------------- |
| id            | Integer      | Not Null, Primary Key |
| test_suite_id | Integer      | Not Null, Foreign Key |
| os_id         | Integer      | Not Null, Foreign Key |
| browser_id    | Integer      | Not Null, Foreign Key |
| hash          | varchar(100) | Not Null              |

```sql
CREATE TABLE
IF NOT EXISTS
  endtest.active_tests (
    id int NOT NULL AUTO_INCREMENT,
    test_suite_id int NOT NULL,
    os_id int NOT NULL,
    browser_id int NOT NULL,
    hash varchar(100) NOT NULL,
    Primary Key(id),
    Foreign Key(test_suite_id) REFERENCES test_suites(id),
    Foreign Key(os_id) REFERENCES os(id),
    Foreign Key(browser_id) REFERENCES browsers(id)
  )
;
```

### Platform
This will store the combination of browser and operating system and other values needed to run a test in endtest.

| Column     | Data Type   | Constraints           |
| ---------- | ----------- | --------------------- |
| id         | Integer     | Not Null, Primary Key |
| os_id      | Integer     | Not Null, Foreign Key |
| browser_id | Integer     | Not Null, Foreign Key |
| resolution | varchar(10) | Not Null              |
| location   | varchar(10) | Not Null              |

```sql
CREATE TABLE
IF NOT EXISTS
  endtest.platforms (
      id int NOT NULL AUTO_INCREMENT,
      os_id int NOT NULL,
      browser_id int NOT NULL,
      resolution varchar(10) NOT NULL,
      location varchar(10) NOT NULL,
      PRIMARY KEY(id),
      FOREIGN KEY(os_id) REFERENCES os(id),
      FOREIGN KEY(browser_id) REFERENCES browsers(id)
  )
;
```

### Results
This will store the text value of either failures or errors from the results from endtest.
Error Code [1 => Failed, 2 => Error]

| Column     | Data Type | Constraints           |
| ---------- | --------- | --------------------- |
| id         | Integer   | Not Null, Primary Key |
| error_code | Integer   | Not Null              |
| value      | Text      | Not Null              |

```sql
CREATE TABLE
IF NOT EXISTS
  endtest.results (
    id int NOT NULL AUTO_INCREMENT,
    error_code int NOT NULL,
    value Text NOT NULL,
    PRIMARY KEY(id)
  )
;
```

### Test Case
This will store a ran test suite. It will contain the test suite itself, platform, and results.

| Column        | Data Type | Contraints            |
| ------------- | --------- | --------------------- |
| id            | Integer   | Not Null, Primary Key |
| test_suite_id | Integer   | Not Null, Foreign Key |
| platform_id   | Integer   | Not Null, Foreign Key |
| os_id         | Integer   | Not Null, Foreign Key |
| date          | Date      |                       |
| passed        | Integer   |                       |
| failed        | Integer   |                       |
| error         | Integer   |                       |

```sql
CREATE TABLE
IF NOT EXISTS
  endtest.test_cases (
    id int NOT NULL AUTO_INCREMENT,
    test_suite_id int NOT NULL,
    browser_id int NOT NULL,
    os_id int NOT NULL,
    date Date,
    passed int,
    failed int,
    error int,
    PRIMARY KEY(id),
    FOREIGN KEY(test_suite_id) REFERENCES test_suites(id),
    FOREIGN KEY(browser_id) REFERENCES browsers(id),
    FOREIGN KEY(os_id) REFERENCES os(id)
  )
;
```

### Test Suite
This will store all test suites from endtest.

| Column     | Data Type   | Contraints            |
| ---------- | ----------- | --------------------- |
| id         | Integer     | Not Null, Primary Key |
| name       | varchar(50) | Not Null              |
| app_id     | Integer     | Not Null              |
| app_code   | Integer     | Not Null              |
| test_suite | Integer     | Not Null              |

```sql
CREATE TABLE
IF NOT EXISTS
  endtest.test_suites (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    app_id int NOT NULL,
    app_code int NOT NULL,
    test_suite int NOT NULL,
    Primary Key(id)
  )
;
```

### Session
This table stores session for authentication.

| Column  | Data Type    | Constraints           |
| ------- | ------------ | --------------------- |
| id      | Integer      | Not Null, Primary Key |
| session | Big Integer  | Not Null, Unique      |
| token   | varchar(150) | Not Null, Unique      |

```sql
CREATE TABLE
IF NOT EXISTS
  endtest.sessions (
    id int NOT NULL AUTO_INCREMENT,
    session BIGINT NOT NULL UNIQUE,
    token varchar(150) NOT NULL UNIQUE,
    Primary Key(id)
  )
;
```

## Relational Tables

### Test Cases (1 -> M) Results

This table records each result from a test case.

| Column       | Data Type | Constraints           |
| ------------ | --------- | --------------------- |
| id           | Integer   | Not Null, Primary Key |
| test_case_id | Integer   | Not Null, Foreign Key |
| result_id    | Integer   | Not Null, Foreign Key |

```sql
CREATE TABLE
IF NOT EXISTS
  endtest.test_cases_results (
    id int NOT NULL AUTO_INCREMENT,
    test_case_id int NOT NULL,
    result_id int NOT NULL,
    Primary Key(id),
    Foreign Key(test_case_id) REFERENCES test_cases(id),
    Foreign Key(result_id) REFERENCES results(id)
  )
;
```