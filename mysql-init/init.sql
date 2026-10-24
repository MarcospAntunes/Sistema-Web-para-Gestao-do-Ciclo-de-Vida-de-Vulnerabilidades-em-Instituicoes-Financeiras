-- =============================================================
--  VulnTracker - Script de Inicializacao do Banco de Dados
--  Executado automaticamente pelo MySQL na primeira inicializacao
-- =============================================================

CREATE DATABASE IF NOT EXISTS `vulnTrackerDb`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `vulnTrackerDb`;

-- Garante que o usuario da aplicacao tem acesso total ao banco
-- (necessario pois MYSQL_USER so recebe grants via env var no primeiro boot)
GRANT ALL PRIVILEGES ON `vulnTrackerDb`.* TO 'admin'@'%';
FLUSH PRIVILEGES;


-- -----------------------------------------------------------
-- Tabela: Roles
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Roles` (
  `Id`          INT          NOT NULL AUTO_INCREMENT,
  `Name`        VARCHAR(255) NOT NULL,
  `AccessLevel` INT          NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- Tabela: Users
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users` (
  `Id`           INT          NOT NULL AUTO_INCREMENT,
  `Name`         VARCHAR(255) NOT NULL,
  `Email`        VARCHAR(255) NOT NULL,
  `PasswordHash` VARCHAR(255) NOT NULL,
  `RoleId`       INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UQ_Users_Email` (`Email`),
  CONSTRAINT `FK_Users_Roles`
    FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`Id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- Tabela: Vulnerabilities
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Vulnerabilities` (
  `Id`              INT            NOT NULL AUTO_INCREMENT,
  `Title`           VARCHAR(255)   NOT NULL,
  `Description`     TEXT           NOT NULL,
  `Cve`             VARCHAR(20)    NOT NULL,
  `CveScore`        DECIMAL(4,1)   NOT NULL,
  `CvssVersion`     VARCHAR(10)    NOT NULL,
  `CvssVector`      VARCHAR(255)   NULL,
  `Status`          INT            NOT NULL DEFAULT 0,
  `Severity`        INT            NOT NULL DEFAULT 0,
  `Priority`        INT            NOT NULL DEFAULT 0,
  `CreatedByUserId` INT            NOT NULL,
  `AssignedUserId`  INT            NOT NULL,
  `DiscoveredAt`    DATETIME       NOT NULL,
  `DueDate`         DATETIME       NOT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `FK_Vulnerabilities_CreatedBy`
    FOREIGN KEY (`CreatedByUserId`) REFERENCES `Users` (`Id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_Vulnerabilities_AssignedTo`
    FOREIGN KEY (`AssignedUserId`) REFERENCES `Users` (`Id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- Tabela: VulnerabilityHistories (Trilha de Auditoria)
-- -----------------------------------------------------------
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
  CONSTRAINT `FK_History_Vulnerability`
    FOREIGN KEY (`VulnerabilityId`) REFERENCES `Vulnerabilities` (`Id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_History_User`
    FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- Seed: Roles
-- -----------------------------------------------------------
INSERT IGNORE INTO `Roles` (`Id`, `Name`, `AccessLevel`)
VALUES (1, 'Admin', 3);

INSERT IGNORE INTO `Roles` (`Id`, `Name`, `AccessLevel`)
VALUES (2, 'Analista', 2);

INSERT IGNORE INTO `Roles` (`Id`, `Name`, `AccessLevel`)
VALUES (3, 'Visualizador', 1);

-- -----------------------------------------------------------
-- Seed: Usuario Administrador
--   Email : admin@vulntracker.com
--   Senha : Admin@2026!
--   Hash  : BCrypt work-factor 12
-- -----------------------------------------------------------
INSERT IGNORE INTO `Users` (`Id`, `Name`, `Email`, `PasswordHash`, `RoleId`)
VALUES (
  1,
  'Administrador',
  'admin@vulntracker.com',
  '$2a$12$v56grZYpU3MdIDgjvFNLc.IvHb0trTL8LCCC5y6J3zQLsA2xBziMC',
  1
);
