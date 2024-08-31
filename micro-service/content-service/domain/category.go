package domain

import (
	"time"
)

type CategoryType int

const (
	CategoryTypeAll CategoryType = iota
	CategoryTypeTrend
	CategoryTypeLanguage
	CategoryTypeFrontend
	CategoryTypeBackend
	CategoryTypeMobile
	CategoryTypeCloud
	CategoryTypeLibrary
	CategoryTypeTool
	CategoryTypeDatabase
	CategoryTypeInfrastructure
	CategoryTypeMachineLearning
	CategoryTypeSecurity
	CategoryTypeNetwork
	CategoryTypeDevOps
	CategoryTypeDesign
	CategoryTypeManagement
	CategoryTypeFinance
	CategoryTypeBusiness
	CategoryTypeCareer
	CategoryTypeOthers
)

type Category struct {
	ID        string
	Name      string
	Type      CategoryType
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}
