package repository

import (
	"context"
	"github.com/machinebox/graphql"
)

type FeedFilterRequest struct {
	Type string   `json:"type"`
	Tags []string `json:"tags"`
}

type HashnodeFeedQueryResponse struct {
	Feed HashnodeFeed `json:"feed"`
}

type HashnodeFeed struct {
	Edges []struct {
		Node struct {
			Title string `json:"title"`
			Brief string `json:"brief"`
			URL   string `json:"url"`
			Tags  []struct {
				ID   string `json:"id"`
				Name string `json:"name"`
				Slug string `json:"slug"`
			} `json:"tags"`
			Author struct {
				ID   string `json:"id"`
				Name string `json:"name"`
			} `json:"author"`
			PublishedAt string `json:"publishedAt"`
			CoverImage  struct {
				URL string `json:"url"`
			} `json:"coverImage"`
			ReactionCount int `json:"reactionCount"`
		} `json:"node"`
	} `json:"edges"`
}

type GetHashnodeArticlesArg struct {
	Tag *string
}

func (r *Repository) GetHashnodeArticles(arg GetHashnodeArticlesArg) (HashnodeFeedQueryResponse, error) {

	query := `
	query Feed(
	  $first: Int!,
	  $filter: FeedFilter
	)
	{
		feed(
			first: $first,
			filter: $filter
	    ) {
			edges {
		  		node {
					title
					brief
					url
					tags {
						id
						name
						slug
					}
					author{
					  id
					  name
					}
					publishedAt
					coverImage {
					  url
					}
					reactionCount
				}
			}
	  }
	}
	`

	request := graphql.NewRequest(query)
	request.Var("first", 10)
	varFeedFilter := FeedFilterRequest{
		Type: "FEATURED",
	}
	if arg.Tag != nil {
		varFeedFilter.Tags = []string{*arg.Tag}
	}
	request.Var("filter", varFeedFilter)
	var response HashnodeFeedQueryResponse
	hashnodeClient := r.apiClient.GetHashnodeClient()
	err := hashnodeClient.Run(context.Background(), request, &response)
	if err != nil {
		return HashnodeFeedQueryResponse{}, err
	}

	return response, nil
}
