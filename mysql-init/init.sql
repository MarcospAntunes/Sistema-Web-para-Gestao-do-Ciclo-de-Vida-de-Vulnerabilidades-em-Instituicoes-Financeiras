SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS `vulnTrackerDb`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `vulnTrackerDb`;

GRANT ALL PRIVILEGES ON `vulnTrackerDb`.* TO 'admin'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS `Roles` (
  `Id`          INT          NOT NULL AUTO_INCREMENT,
  `Name`        VARCHAR(255) NOT NULL,
  `AccessLevel` INT          NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `Users` (
  `Id`           INT          NOT NULL AUTO_INCREMENT,
  `Name`         VARCHAR(255) NOT NULL,
  `Email`        VARCHAR(255) NOT NULL,
  `PasswordHash` VARCHAR(255) NOT NULL,
  `RoleId`       INT          NOT NULL DEFAULT 2,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UQ_Users_Email` (`Email`),
  CONSTRAINT `FK_Users_Roles`
    FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`Id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `Vulnerabilities` (
  `Id`               INT            NOT NULL AUTO_INCREMENT,
  `Title`            VARCHAR(255)   NOT NULL,
  `Description`      TEXT           NOT NULL,
  `Cve`              VARCHAR(20)    NOT NULL,
  `CveScore`         DECIMAL(3,1)   NOT NULL,
  `CvssVersion`      VARCHAR(10)    NOT NULL,
  `CvssVector`       VARCHAR(255)   NULL,
  `Status`           INT            NOT NULL DEFAULT 0,
  `Severity`         INT            NOT NULL DEFAULT 0,
  `Priority`         INT            NOT NULL DEFAULT 0,
  `Asset`            VARCHAR(255)   NOT NULL DEFAULT 'Não informado',
  `AssetEnvironment` VARCHAR(100)   NULL,
  `AssetCriticality` INT            NOT NULL DEFAULT 1,
  `Exposure`         INT            NOT NULL DEFAULT 1,
  `CreatedByUserId`  INT            NOT NULL,
  `AssignedUserId`   INT            NOT NULL,
  `DiscoveredAt`     DATETIME       NOT NULL,
  `DueDate`          DATETIME       NOT NULL,
  `ResolvedAt`       DATETIME       NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Vulnerabilities_Status` (`Status`),
  KEY `IX_Vulnerabilities_Severity` (`Severity`),
  KEY `IX_Vulnerabilities_DueDate` (`DueDate`),
  KEY `IX_Vulnerabilities_Cve` (`Cve`),
  CONSTRAINT `FK_Vulnerabilities_CreatedBy`
    FOREIGN KEY (`CreatedByUserId`) REFERENCES `Users` (`Id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_Vulnerabilities_AssignedTo`
    FOREIGN KEY (`AssignedUserId`) REFERENCES `Users` (`Id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `VulnerabilityHistories` (
  `Id`              INT            NOT NULL AUTO_INCREMENT,
  `VulnerabilityId` INT            NOT NULL,
  `UserId`          INT            NOT NULL,
  `Action`          VARCHAR(500)   NOT NULL,
  `Comment`         VARCHAR(2000)  NULL,
  `OldStatus`       VARCHAR(50)    NULL,
  `NewStatus`       VARCHAR(50)    NULL,
  `CreatedAt`       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `IX_VulnerabilityHistories_VulnerabilityId_CreatedAt` (`VulnerabilityId`, `CreatedAt`),
  CONSTRAINT `FK_History_Vulnerability`
    FOREIGN KEY (`VulnerabilityId`) REFERENCES `Vulnerabilities` (`Id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_History_User`
    FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO `Roles` (`Id`, `Name`, `AccessLevel`)
VALUES (1, 'Admin', 3);

INSERT IGNORE INTO `Roles` (`Id`, `Name`, `AccessLevel`)
VALUES (2, 'Analista', 2);

INSERT IGNORE INTO `Roles` (`Id`, `Name`, `AccessLevel`)
VALUES (3, 'Visualizador', 1);

INSERT IGNORE INTO `Users` (`Id`, `Name`, `Email`, `PasswordHash`, `RoleId`)
VALUES (
  1,
  'Administrador',
  'admin@vulntracker.com',
  '$2a$12$v56grZYpU3MdIDgjvFNLc.IvHb0trTL8LCCC5y6J3zQLsA2xBziMC',
  1
);