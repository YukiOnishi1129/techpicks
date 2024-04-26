package usecase

import "github.com/YukiOnishi1129/techpicks/batch-service/domain"

type seedCategory struct {
	Name           string
	Type           domain.CategoryType
	seedCategoryID int
}

func getCategoryDatas() []seedCategory {
	return []seedCategory{
		{
			Name:           "All",
			Type:           domain.CategoryTypeAll,
			seedCategoryID: 1,
		},
		{
			Name:           "Trend",
			Type:           domain.CategoryTypeTrend,
			seedCategoryID: 2,
		},
		{
			Name:           "Technology",
			Type:           domain.CategoryTypeAll,
			seedCategoryID: 3,
		},
		{
			Name:           "Programming",
			Type:           domain.CategoryTypeAll,
			seedCategoryID: 4,
		},
		{
			Name:           "JavaScript",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 5,
		},
		{
			Name:           "TypeScript",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 6,
		},
		{
			Name:           "Python",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 7,
		},
		{
			Name:           "Ruby",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 8,
		},
		{
			Name:           "Golang",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 9,
		},
		{
			Name:           "Java",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 10,
		},
		{
			Name:           "Kotlin",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 11,
		},
		{
			Name:           "Swift",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 12,
		},
		{
			Name:           "PHP",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 13,
		},
		{
			Name:           "C",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 14,
		},
		{
			Name:           "C++",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 15,
		},
		{
			Name:           "Rust",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 16,
		},
		{
			Name:           "Scala",
			Type:           domain.CategoryTypeLanguage,
			seedCategoryID: 17,
		},
		{
			Name:           "React",
			Type:           domain.CategoryTypeFrontend,
			seedCategoryID: 18,
		},
		{
			Name:           "Vue",
			Type:           domain.CategoryTypeFrontend,
			seedCategoryID: 19,
		},
		{
			Name:           "Next.js",
			Type:           domain.CategoryTypeFrontend,
			seedCategoryID: 20,
		},
		{
			Name:           "Nuxt.js",
			Type:           domain.CategoryTypeFrontend,
			seedCategoryID: 21,
		},
		{
			Name:           "Node.js",
			Type:           domain.CategoryTypeBackend,
			seedCategoryID: 22,
		},
		{
			Name:           "express",
			Type:           domain.CategoryTypeBackend,
			seedCategoryID: 23,
		},
		{
			Name:           "Nestjs",
			Type:           domain.CategoryTypeBackend,
			seedCategoryID: 24,
		},
		{
			Name:           "Infrastructure",
			Type:           domain.CategoryTypeInfrastructure,
			seedCategoryID: 25,
		},
		{
			Name:           "React Native",
			Type:           domain.CategoryTypeMobile,
			seedCategoryID: 26,
		},
		{
			Name:           "Flutter",
			Type:           domain.CategoryTypeMobile,
			seedCategoryID: 27,
		},
		{
			Name:           "AWS",
			Type:           domain.CategoryTypeCloud,
			seedCategoryID: 28,
		},
		{
			Name:           "GCP",
			Type:           domain.CategoryTypeCloud,
			seedCategoryID: 29,
		},
		{
			Name:           "Azure",
			Type:           domain.CategoryTypeCloud,
			seedCategoryID: 30,
		},
		{
			Name:           "Docker",
			Type:           domain.CategoryTypeInfrastructure,
			seedCategoryID: 31,
		},
		{
			Name:           "Kubernetes",
			Type:           domain.CategoryTypeInfrastructure,
			seedCategoryID: 32,
		},
		{
			Name:           "Machine Learning",
			Type:           domain.CategoryTypeMachineLearning,
			seedCategoryID: 33,
		},
		{
			Name:           "Deep Learning",
			Type:           domain.CategoryTypeMachineLearning,
			seedCategoryID: 34,
		},
		{
			Name:           "Security",
			Type:           domain.CategoryTypeSecurity,
			seedCategoryID: 35,
		},
		{
			Name:           "GraphQL",
			Type:           domain.CategoryTypeLibrary,
			seedCategoryID: 36,
		},
		{
			Name:           "GitHub",
			Type:           domain.CategoryTypeTool,
			seedCategoryID: 37,
		},
		{
			Name:           "Git",
			Type:           domain.CategoryTypeTool,
			seedCategoryID: 38,
		},
		{
			Name:           "VSCode",
			Type:           domain.CategoryTypeTool,
			seedCategoryID: 39,
		},
		{
			Name:           "GitHub Actions",
			Type:           domain.CategoryTypeDevOps,
			seedCategoryID: 40,
		},
		{
			Name:           "ChatGPT",
			Type:           domain.CategoryTypeTool,
			seedCategoryID: 41,
		},
		{
			Name:           "個人開発",
			Type:           domain.CategoryTypeOthers,
			seedCategoryID: 42,
		},
		{
			Name:           "Frontend",
			Type:           domain.CategoryTypeFrontend,
			seedCategoryID: 43,
		},
		{
			Name:           "Test",
			Type:           domain.CategoryTypeOthers,
			seedCategoryID: 44,
		},
		{
			Name:           "Expo",
			Type:           domain.CategoryTypeMobile,
			seedCategoryID: 45,
		},
		{
			Name:           "Devops",
			Type:           domain.CategoryTypeDevOps,
			seedCategoryID: 46,
		},
		{
			Name:           "Engineering",
			Type:           domain.CategoryTypeAll,
			seedCategoryID: 47,
		},
		{
			Name:           "Design",
			Type:           domain.CategoryTypeDesign,
			seedCategoryID: 48,
		},
		{
			Name:           "Finance",
			Type:           domain.CategoryTypeFinance,
			seedCategoryID: 49,
		},
		{
			Name:           "Project",
			Type:           domain.CategoryTypeManagement,
			seedCategoryID: 50,
		},
		{
			Name:           "Product",
			Type:           domain.CategoryTypeDevOps,
			seedCategoryID: 51,
		},
		{
			Name:           "AI",
			Type:           domain.CategoryTypeMachineLearning,
			seedCategoryID: 52,
		},
		{
			Name:           "Backend",
			Type:           domain.CategoryTypeBackend,
			seedCategoryID: 53,
		},
		{
			Name:           "Mobile",
			Type:           domain.CategoryTypeMobile,
			seedCategoryID: 54,
		},
	}
}
