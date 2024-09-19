// Code generated by MockGen. DO NOT EDIT.
// Source: grpc/favorite/favorite_grpc.pb.go

// Package mock is a generated GoMock package.
package mock

import (
	context "context"
	reflect "reflect"

	favorite "github.com/YukiOnishi1129/techpicks/micro-service/content-service/grpc/favorite"
	gomock "github.com/golang/mock/gomock"
	grpc "google.golang.org/grpc"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

// MockFavoriteServiceClient is a mock of FavoriteServiceClient interface.
type MockFavoriteServiceClient struct {
	ctrl     *gomock.Controller
	recorder *MockFavoriteServiceClientMockRecorder
}

// MockFavoriteServiceClientMockRecorder is the mock recorder for MockFavoriteServiceClient.
type MockFavoriteServiceClientMockRecorder struct {
	mock *MockFavoriteServiceClient
}

// NewMockFavoriteServiceClient creates a new mock instance.
func NewMockFavoriteServiceClient(ctrl *gomock.Controller) *MockFavoriteServiceClient {
	mock := &MockFavoriteServiceClient{ctrl: ctrl}
	mock.recorder = &MockFavoriteServiceClientMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockFavoriteServiceClient) EXPECT() *MockFavoriteServiceClientMockRecorder {
	return m.recorder
}

// CreateFavoriteArticle mocks base method.
func (m *MockFavoriteServiceClient) CreateFavoriteArticle(ctx context.Context, in *favorite.CreateFavoriteArticleRequest, opts ...grpc.CallOption) (*favorite.CreateFavoriteArticleResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{ctx, in}
	for _, a := range opts {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "CreateFavoriteArticle", varargs...)
	ret0, _ := ret[0].(*favorite.CreateFavoriteArticleResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateFavoriteArticle indicates an expected call of CreateFavoriteArticle.
func (mr *MockFavoriteServiceClientMockRecorder) CreateFavoriteArticle(ctx, in interface{}, opts ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{ctx, in}, opts...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateFavoriteArticle", reflect.TypeOf((*MockFavoriteServiceClient)(nil).CreateFavoriteArticle), varargs...)
}

// CreateFavoriteArticleFolder mocks base method.
func (m *MockFavoriteServiceClient) CreateFavoriteArticleFolder(ctx context.Context, in *favorite.CreateFavoriteArticleFolderRequest, opts ...grpc.CallOption) (*favorite.CreateFavoriteArticleFolderResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{ctx, in}
	for _, a := range opts {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "CreateFavoriteArticleFolder", varargs...)
	ret0, _ := ret[0].(*favorite.CreateFavoriteArticleFolderResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateFavoriteArticleFolder indicates an expected call of CreateFavoriteArticleFolder.
func (mr *MockFavoriteServiceClientMockRecorder) CreateFavoriteArticleFolder(ctx, in interface{}, opts ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{ctx, in}, opts...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateFavoriteArticleFolder", reflect.TypeOf((*MockFavoriteServiceClient)(nil).CreateFavoriteArticleFolder), varargs...)
}

// DeleteFavoriteArticle mocks base method.
func (m *MockFavoriteServiceClient) DeleteFavoriteArticle(ctx context.Context, in *favorite.DeleteFavoriteArticleRequest, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{ctx, in}
	for _, a := range opts {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "DeleteFavoriteArticle", varargs...)
	ret0, _ := ret[0].(*emptypb.Empty)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// DeleteFavoriteArticle indicates an expected call of DeleteFavoriteArticle.
func (mr *MockFavoriteServiceClientMockRecorder) DeleteFavoriteArticle(ctx, in interface{}, opts ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{ctx, in}, opts...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteFavoriteArticle", reflect.TypeOf((*MockFavoriteServiceClient)(nil).DeleteFavoriteArticle), varargs...)
}

// DeleteFavoriteArticleFolder mocks base method.
func (m *MockFavoriteServiceClient) DeleteFavoriteArticleFolder(ctx context.Context, in *favorite.DeleteFavoriteArticleFolderRequest, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{ctx, in}
	for _, a := range opts {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "DeleteFavoriteArticleFolder", varargs...)
	ret0, _ := ret[0].(*emptypb.Empty)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// DeleteFavoriteArticleFolder indicates an expected call of DeleteFavoriteArticleFolder.
func (mr *MockFavoriteServiceClientMockRecorder) DeleteFavoriteArticleFolder(ctx, in interface{}, opts ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{ctx, in}, opts...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteFavoriteArticleFolder", reflect.TypeOf((*MockFavoriteServiceClient)(nil).DeleteFavoriteArticleFolder), varargs...)
}

// GetFavoriteArticleFolderByArticleId mocks base method.
func (m *MockFavoriteServiceClient) GetFavoriteArticleFolderByArticleId(ctx context.Context, in *favorite.GetFavoriteArticleFolderByArticleIdRequest, opts ...grpc.CallOption) (*favorite.GetFavoriteArticleFolderResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{ctx, in}
	for _, a := range opts {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "GetFavoriteArticleFolderByArticleId", varargs...)
	ret0, _ := ret[0].(*favorite.GetFavoriteArticleFolderResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetFavoriteArticleFolderByArticleId indicates an expected call of GetFavoriteArticleFolderByArticleId.
func (mr *MockFavoriteServiceClientMockRecorder) GetFavoriteArticleFolderByArticleId(ctx, in interface{}, opts ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{ctx, in}, opts...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetFavoriteArticleFolderByArticleId", reflect.TypeOf((*MockFavoriteServiceClient)(nil).GetFavoriteArticleFolderByArticleId), varargs...)
}

// GetFavoriteArticleFolders mocks base method.
func (m *MockFavoriteServiceClient) GetFavoriteArticleFolders(ctx context.Context, in *favorite.GetFavoriteArticleFoldersRequest, opts ...grpc.CallOption) (*favorite.GetFavoriteArticleFoldersResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{ctx, in}
	for _, a := range opts {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "GetFavoriteArticleFolders", varargs...)
	ret0, _ := ret[0].(*favorite.GetFavoriteArticleFoldersResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetFavoriteArticleFolders indicates an expected call of GetFavoriteArticleFolders.
func (mr *MockFavoriteServiceClientMockRecorder) GetFavoriteArticleFolders(ctx, in interface{}, opts ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{ctx, in}, opts...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetFavoriteArticleFolders", reflect.TypeOf((*MockFavoriteServiceClient)(nil).GetFavoriteArticleFolders), varargs...)
}

// GetFavoriteArticles mocks base method.
func (m *MockFavoriteServiceClient) GetFavoriteArticles(ctx context.Context, in *favorite.GetFavoriteArticlesRequest, opts ...grpc.CallOption) (*favorite.GetFavoriteArticlesResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{ctx, in}
	for _, a := range opts {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "GetFavoriteArticles", varargs...)
	ret0, _ := ret[0].(*favorite.GetFavoriteArticlesResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetFavoriteArticles indicates an expected call of GetFavoriteArticles.
func (mr *MockFavoriteServiceClientMockRecorder) GetFavoriteArticles(ctx, in interface{}, opts ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{ctx, in}, opts...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetFavoriteArticles", reflect.TypeOf((*MockFavoriteServiceClient)(nil).GetFavoriteArticles), varargs...)
}

// UpdateFavoriteArticleFolder mocks base method.
func (m *MockFavoriteServiceClient) UpdateFavoriteArticleFolder(ctx context.Context, in *favorite.UpdateFavoriteArticleFolderRequest, opts ...grpc.CallOption) (*favorite.UpdateFavoriteArticleFolderResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{ctx, in}
	for _, a := range opts {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "UpdateFavoriteArticleFolder", varargs...)
	ret0, _ := ret[0].(*favorite.UpdateFavoriteArticleFolderResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateFavoriteArticleFolder indicates an expected call of UpdateFavoriteArticleFolder.
func (mr *MockFavoriteServiceClientMockRecorder) UpdateFavoriteArticleFolder(ctx, in interface{}, opts ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{ctx, in}, opts...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateFavoriteArticleFolder", reflect.TypeOf((*MockFavoriteServiceClient)(nil).UpdateFavoriteArticleFolder), varargs...)
}

// MockFavoriteServiceServer is a mock of FavoriteServiceServer interface.
type MockFavoriteServiceServer struct {
	ctrl     *gomock.Controller
	recorder *MockFavoriteServiceServerMockRecorder
}

// MockFavoriteServiceServerMockRecorder is the mock recorder for MockFavoriteServiceServer.
type MockFavoriteServiceServerMockRecorder struct {
	mock *MockFavoriteServiceServer
}

// NewMockFavoriteServiceServer creates a new mock instance.
func NewMockFavoriteServiceServer(ctrl *gomock.Controller) *MockFavoriteServiceServer {
	mock := &MockFavoriteServiceServer{ctrl: ctrl}
	mock.recorder = &MockFavoriteServiceServerMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockFavoriteServiceServer) EXPECT() *MockFavoriteServiceServerMockRecorder {
	return m.recorder
}

// CreateFavoriteArticle mocks base method.
func (m *MockFavoriteServiceServer) CreateFavoriteArticle(arg0 context.Context, arg1 *favorite.CreateFavoriteArticleRequest) (*favorite.CreateFavoriteArticleResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateFavoriteArticle", arg0, arg1)
	ret0, _ := ret[0].(*favorite.CreateFavoriteArticleResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateFavoriteArticle indicates an expected call of CreateFavoriteArticle.
func (mr *MockFavoriteServiceServerMockRecorder) CreateFavoriteArticle(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateFavoriteArticle", reflect.TypeOf((*MockFavoriteServiceServer)(nil).CreateFavoriteArticle), arg0, arg1)
}

// CreateFavoriteArticleFolder mocks base method.
func (m *MockFavoriteServiceServer) CreateFavoriteArticleFolder(arg0 context.Context, arg1 *favorite.CreateFavoriteArticleFolderRequest) (*favorite.CreateFavoriteArticleFolderResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateFavoriteArticleFolder", arg0, arg1)
	ret0, _ := ret[0].(*favorite.CreateFavoriteArticleFolderResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateFavoriteArticleFolder indicates an expected call of CreateFavoriteArticleFolder.
func (mr *MockFavoriteServiceServerMockRecorder) CreateFavoriteArticleFolder(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateFavoriteArticleFolder", reflect.TypeOf((*MockFavoriteServiceServer)(nil).CreateFavoriteArticleFolder), arg0, arg1)
}

// DeleteFavoriteArticle mocks base method.
func (m *MockFavoriteServiceServer) DeleteFavoriteArticle(arg0 context.Context, arg1 *favorite.DeleteFavoriteArticleRequest) (*emptypb.Empty, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteFavoriteArticle", arg0, arg1)
	ret0, _ := ret[0].(*emptypb.Empty)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// DeleteFavoriteArticle indicates an expected call of DeleteFavoriteArticle.
func (mr *MockFavoriteServiceServerMockRecorder) DeleteFavoriteArticle(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteFavoriteArticle", reflect.TypeOf((*MockFavoriteServiceServer)(nil).DeleteFavoriteArticle), arg0, arg1)
}

// DeleteFavoriteArticleFolder mocks base method.
func (m *MockFavoriteServiceServer) DeleteFavoriteArticleFolder(arg0 context.Context, arg1 *favorite.DeleteFavoriteArticleFolderRequest) (*emptypb.Empty, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteFavoriteArticleFolder", arg0, arg1)
	ret0, _ := ret[0].(*emptypb.Empty)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// DeleteFavoriteArticleFolder indicates an expected call of DeleteFavoriteArticleFolder.
func (mr *MockFavoriteServiceServerMockRecorder) DeleteFavoriteArticleFolder(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteFavoriteArticleFolder", reflect.TypeOf((*MockFavoriteServiceServer)(nil).DeleteFavoriteArticleFolder), arg0, arg1)
}

// GetFavoriteArticleFolderByArticleId mocks base method.
func (m *MockFavoriteServiceServer) GetFavoriteArticleFolderByArticleId(arg0 context.Context, arg1 *favorite.GetFavoriteArticleFolderByArticleIdRequest) (*favorite.GetFavoriteArticleFolderResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetFavoriteArticleFolderByArticleId", arg0, arg1)
	ret0, _ := ret[0].(*favorite.GetFavoriteArticleFolderResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetFavoriteArticleFolderByArticleId indicates an expected call of GetFavoriteArticleFolderByArticleId.
func (mr *MockFavoriteServiceServerMockRecorder) GetFavoriteArticleFolderByArticleId(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetFavoriteArticleFolderByArticleId", reflect.TypeOf((*MockFavoriteServiceServer)(nil).GetFavoriteArticleFolderByArticleId), arg0, arg1)
}

// GetFavoriteArticleFolders mocks base method.
func (m *MockFavoriteServiceServer) GetFavoriteArticleFolders(arg0 context.Context, arg1 *favorite.GetFavoriteArticleFoldersRequest) (*favorite.GetFavoriteArticleFoldersResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetFavoriteArticleFolders", arg0, arg1)
	ret0, _ := ret[0].(*favorite.GetFavoriteArticleFoldersResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetFavoriteArticleFolders indicates an expected call of GetFavoriteArticleFolders.
func (mr *MockFavoriteServiceServerMockRecorder) GetFavoriteArticleFolders(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetFavoriteArticleFolders", reflect.TypeOf((*MockFavoriteServiceServer)(nil).GetFavoriteArticleFolders), arg0, arg1)
}

// GetFavoriteArticles mocks base method.
func (m *MockFavoriteServiceServer) GetFavoriteArticles(arg0 context.Context, arg1 *favorite.GetFavoriteArticlesRequest) (*favorite.GetFavoriteArticlesResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetFavoriteArticles", arg0, arg1)
	ret0, _ := ret[0].(*favorite.GetFavoriteArticlesResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetFavoriteArticles indicates an expected call of GetFavoriteArticles.
func (mr *MockFavoriteServiceServerMockRecorder) GetFavoriteArticles(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetFavoriteArticles", reflect.TypeOf((*MockFavoriteServiceServer)(nil).GetFavoriteArticles), arg0, arg1)
}

// UpdateFavoriteArticleFolder mocks base method.
func (m *MockFavoriteServiceServer) UpdateFavoriteArticleFolder(arg0 context.Context, arg1 *favorite.UpdateFavoriteArticleFolderRequest) (*favorite.UpdateFavoriteArticleFolderResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateFavoriteArticleFolder", arg0, arg1)
	ret0, _ := ret[0].(*favorite.UpdateFavoriteArticleFolderResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateFavoriteArticleFolder indicates an expected call of UpdateFavoriteArticleFolder.
func (mr *MockFavoriteServiceServerMockRecorder) UpdateFavoriteArticleFolder(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateFavoriteArticleFolder", reflect.TypeOf((*MockFavoriteServiceServer)(nil).UpdateFavoriteArticleFolder), arg0, arg1)
}

// MockUnsafeFavoriteServiceServer is a mock of UnsafeFavoriteServiceServer interface.
type MockUnsafeFavoriteServiceServer struct {
	ctrl     *gomock.Controller
	recorder *MockUnsafeFavoriteServiceServerMockRecorder
}

// MockUnsafeFavoriteServiceServerMockRecorder is the mock recorder for MockUnsafeFavoriteServiceServer.
type MockUnsafeFavoriteServiceServerMockRecorder struct {
	mock *MockUnsafeFavoriteServiceServer
}

// NewMockUnsafeFavoriteServiceServer creates a new mock instance.
func NewMockUnsafeFavoriteServiceServer(ctrl *gomock.Controller) *MockUnsafeFavoriteServiceServer {
	mock := &MockUnsafeFavoriteServiceServer{ctrl: ctrl}
	mock.recorder = &MockUnsafeFavoriteServiceServerMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockUnsafeFavoriteServiceServer) EXPECT() *MockUnsafeFavoriteServiceServerMockRecorder {
	return m.recorder
}

// mustEmbedUnimplementedFavoriteServiceServer mocks base method.
func (m *MockUnsafeFavoriteServiceServer) mustEmbedUnimplementedFavoriteServiceServer() {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "mustEmbedUnimplementedFavoriteServiceServer")
}

// mustEmbedUnimplementedFavoriteServiceServer indicates an expected call of mustEmbedUnimplementedFavoriteServiceServer.
func (mr *MockUnsafeFavoriteServiceServerMockRecorder) mustEmbedUnimplementedFavoriteServiceServer() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "mustEmbedUnimplementedFavoriteServiceServer", reflect.TypeOf((*MockUnsafeFavoriteServiceServer)(nil).mustEmbedUnimplementedFavoriteServiceServer))
}
