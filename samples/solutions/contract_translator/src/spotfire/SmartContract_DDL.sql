CREATE TABLE `casecount` (
  `date` datetime NOT NULL,
  `count` int DEFAULT NULL,
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `casedata` (
  `caseReference` int NOT NULL,
  `companyName` varchar(100) DEFAULT NULL,
  `docId` varchar(100) DEFAULT NULL,
  `srclang` varchar(45) DEFAULT NULL,
  `translatedDocID` varchar(100) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `creationTime` datetime DEFAULT NULL,
  `modifiedTime` datetime DEFAULT NULL,
  `contractType` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`caseReference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `casestatecount` (
  `id` int NOT NULL,
  `active` int DEFAULT NULL,
  `terminal` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `casestates` (
  `id` int NOT NULL,
  `state` varchar(45) DEFAULT NULL,
  `count` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;