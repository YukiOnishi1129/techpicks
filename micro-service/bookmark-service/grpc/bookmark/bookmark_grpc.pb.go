// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.5.1
// - protoc             v3.20.3
// source: bookmark/bookmark.proto

package bookmark

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.64.0 or later.
const _ = grpc.SupportPackageIsVersion9

const (
	BookmarkService_GetBookmarkByArticleId_FullMethodName = "/checkpicks.bookmark.v1.BookmarkService/GetBookmarkByArticleId"
)

// BookmarkServiceClient is the client API for BookmarkService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type BookmarkServiceClient interface {
	GetBookmarkByArticleId(ctx context.Context, in *GetBookmarkByArticleIdRequest, opts ...grpc.CallOption) (*GetBookmarkResponse, error)
}

type bookmarkServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewBookmarkServiceClient(cc grpc.ClientConnInterface) BookmarkServiceClient {
	return &bookmarkServiceClient{cc}
}

func (c *bookmarkServiceClient) GetBookmarkByArticleId(ctx context.Context, in *GetBookmarkByArticleIdRequest, opts ...grpc.CallOption) (*GetBookmarkResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(GetBookmarkResponse)
	err := c.cc.Invoke(ctx, BookmarkService_GetBookmarkByArticleId_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// BookmarkServiceServer is the server API for BookmarkService service.
// All implementations should embed UnimplementedBookmarkServiceServer
// for forward compatibility.
type BookmarkServiceServer interface {
	GetBookmarkByArticleId(context.Context, *GetBookmarkByArticleIdRequest) (*GetBookmarkResponse, error)
}

// UnimplementedBookmarkServiceServer should be embedded to have
// forward compatible implementations.
//
// NOTE: this should be embedded by value instead of pointer to avoid a nil
// pointer dereference when methods are called.
type UnimplementedBookmarkServiceServer struct{}

func (UnimplementedBookmarkServiceServer) GetBookmarkByArticleId(context.Context, *GetBookmarkByArticleIdRequest) (*GetBookmarkResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetBookmarkByArticleId not implemented")
}
func (UnimplementedBookmarkServiceServer) testEmbeddedByValue() {}

// UnsafeBookmarkServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to BookmarkServiceServer will
// result in compilation errors.
type UnsafeBookmarkServiceServer interface {
	mustEmbedUnimplementedBookmarkServiceServer()
}

func RegisterBookmarkServiceServer(s grpc.ServiceRegistrar, srv BookmarkServiceServer) {
	// If the following call pancis, it indicates UnimplementedBookmarkServiceServer was
	// embedded by pointer and is nil.  This will cause panics if an
	// unimplemented method is ever invoked, so we test this at initialization
	// time to prevent it from happening at runtime later due to I/O.
	if t, ok := srv.(interface{ testEmbeddedByValue() }); ok {
		t.testEmbeddedByValue()
	}
	s.RegisterService(&BookmarkService_ServiceDesc, srv)
}

func _BookmarkService_GetBookmarkByArticleId_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetBookmarkByArticleIdRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(BookmarkServiceServer).GetBookmarkByArticleId(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: BookmarkService_GetBookmarkByArticleId_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(BookmarkServiceServer).GetBookmarkByArticleId(ctx, req.(*GetBookmarkByArticleIdRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// BookmarkService_ServiceDesc is the grpc.ServiceDesc for BookmarkService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var BookmarkService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "checkpicks.bookmark.v1.BookmarkService",
	HandlerType: (*BookmarkServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetBookmarkByArticleId",
			Handler:    _BookmarkService_GetBookmarkByArticleId_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "bookmark/bookmark.proto",
}
