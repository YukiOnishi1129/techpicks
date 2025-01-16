package handler

import (
	"context"

	cpb "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	"google.golang.org/protobuf/types/known/emptypb"
)

func (ch *contentHandler) UpsertArticleComment(ctx context.Context, req *cpb.UpsertArticleCommentRequest) (*cpb.UpsertArticleCommentResponse, error) {
	// res, err := ch.contentUseCase.ListComment(ctx, req)
	// if err != nil {
	// 	return nil, err
	// }
	return nil, nil
}

func (ch *contentHandler) DeleteArticleComment(ctx context.Context, req *cpb.DeleteArticleCommentRequest) (*emptypb.Empty, error) {
	// res, err := ch.contentUseCase.ListComment(ctx, req)
	// if err != nil {
	// 	return nil, err
	// }
	return nil, nil
}
