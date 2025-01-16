package usecase

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	persistenceadapter "github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/adapter/persistence_adapter"
	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/domain/entity"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (cu *contentUseCase) UpsertArticleComment(ctx context.Context, req *cpb.UpsertArticleCommentRequest) (*cpb.UpsertArticleCommentResponse, error) {
	input := persistenceadapter.UpsertArticleCommentAdapterInputDTO{
		UserID:    req.GetUserId(),
		ArticleID: req.GetArticleId(),
		Comment:   req.GetComment(),
	}
	if req.GetId() != nil {
		cID := req.GetId().GetValue()
		input.ID = &cID
	}

	articleComment, err := cu.articleCommentPersistenceAdapter.UpsertArticleComment(ctx, input)
	if err != nil {
		return nil, err
	}

	res := &cpb.UpsertArticleCommentResponse{
		Comment: cu.convertPBComment(articleComment),
	}
	return res, nil
}

func (cu *contentUseCase) DeleteArticleComment(ctx context.Context, req *cpb.DeleteArticleCommentRequest) (*emptypb.Empty, error) {
	input := persistenceadapter.DeleteArticleCommentAdapterInputDTO{
		UserID: req.GetUserId(),
		ID:     req.GetId(),
	}

	err := cu.articleCommentPersistenceAdapter.DeleteArticleComment(ctx, input)
	if err != nil {
		return nil, err
	}
	return &emptypb.Empty{}, nil
}

func (cu *contentUseCase) convertPBComment(ac *entity.ArticleComment) *cpb.ArticleComment {
	return &cpb.ArticleComment{
		Id:        ac.ID,
		UserId:    ac.UserID,
		ArticleId: ac.ArticleID,
		Comment:   ac.Comment,
		CreatedAt: timestamppb.New(ac.CreatedAt),
		UpdatedAt: timestamppb.New(ac.UpdatedAt),
	}
}
