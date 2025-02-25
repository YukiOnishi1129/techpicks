// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content (interfaces: ContentServiceClient,ContentServiceServer,UnsafeContentServiceServer)

// Package mock is a generated GoMock package.
package mock

import (
	context "context"
	reflect "reflect"

	content "github.com/YukiOnishi1129/checkpicks-protocol-buffers/checkpicks-rpc-go/grpc/content"
	gomock "github.com/golang/mock/gomock"
	grpc "google.golang.org/grpc"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

// MockContentServiceClient is a mock of ContentServiceClient interface.
type MockContentServiceClient struct {
	ctrl     *gomock.Controller
	recorder *MockContentServiceClientMockRecorder
}

// MockContentServiceClientMockRecorder is the mock recorder for MockContentServiceClient.
type MockContentServiceClientMockRecorder struct {
	mock *MockContentServiceClient
}

// NewMockContentServiceClient creates a new mock instance.
func NewMockContentServiceClient(ctrl *gomock.Controller) *MockContentServiceClient {
	mock := &MockContentServiceClient{ctrl: ctrl}
	mock.recorder = &MockContentServiceClientMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockContentServiceClient) EXPECT() *MockContentServiceClientMockRecorder {
	return m.recorder
}

// CreateUploadArticle mocks base method.
func (m *MockContentServiceClient) CreateUploadArticle(arg0 context.Context, arg1 *content.CreateUploadArticleRequest, arg2 ...grpc.CallOption) (*content.CreateArticleResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "CreateUploadArticle", varargs...)
	ret0, _ := ret[0].(*content.CreateArticleResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateUploadArticle indicates an expected call of CreateUploadArticle.
func (mr *MockContentServiceClientMockRecorder) CreateUploadArticle(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateUploadArticle", reflect.TypeOf((*MockContentServiceClient)(nil).CreateUploadArticle), varargs...)
}

// DeleteArticleComment mocks base method.
func (m *MockContentServiceClient) DeleteArticleComment(arg0 context.Context, arg1 *content.DeleteArticleCommentRequest, arg2 ...grpc.CallOption) (*emptypb.Empty, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "DeleteArticleComment", varargs...)
	ret0, _ := ret[0].(*emptypb.Empty)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// DeleteArticleComment indicates an expected call of DeleteArticleComment.
func (mr *MockContentServiceClientMockRecorder) DeleteArticleComment(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteArticleComment", reflect.TypeOf((*MockContentServiceClient)(nil).DeleteArticleComment), varargs...)
}

// GetArticle mocks base method.
func (m *MockContentServiceClient) GetArticle(arg0 context.Context, arg1 *content.GetArticleRequest, arg2 ...grpc.CallOption) (*content.GetArticleResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "GetArticle", varargs...)
	ret0, _ := ret[0].(*content.GetArticleResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetArticle indicates an expected call of GetArticle.
func (mr *MockContentServiceClientMockRecorder) GetArticle(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetArticle", reflect.TypeOf((*MockContentServiceClient)(nil).GetArticle), varargs...)
}

// GetArticleOGP mocks base method.
func (m *MockContentServiceClient) GetArticleOGP(arg0 context.Context, arg1 *content.GetArticleOGPRequest, arg2 ...grpc.CallOption) (*content.GetArticleOGPResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "GetArticleOGP", varargs...)
	ret0, _ := ret[0].(*content.GetArticleOGPResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetArticleOGP indicates an expected call of GetArticleOGP.
func (mr *MockContentServiceClientMockRecorder) GetArticleOGP(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetArticleOGP", reflect.TypeOf((*MockContentServiceClient)(nil).GetArticleOGP), varargs...)
}

// GetFeed mocks base method.
func (m *MockContentServiceClient) GetFeed(arg0 context.Context, arg1 *content.GetFeedRequest, arg2 ...grpc.CallOption) (*content.GetFeedResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "GetFeed", varargs...)
	ret0, _ := ret[0].(*content.GetFeedResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetFeed indicates an expected call of GetFeed.
func (mr *MockContentServiceClientMockRecorder) GetFeed(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetFeed", reflect.TypeOf((*MockContentServiceClient)(nil).GetFeed), varargs...)
}

// GetFeeds mocks base method.
func (m *MockContentServiceClient) GetFeeds(arg0 context.Context, arg1 *content.GetFeedsRequest, arg2 ...grpc.CallOption) (*content.GetFeedsResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "GetFeeds", varargs...)
	ret0, _ := ret[0].(*content.GetFeedsResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetFeeds indicates an expected call of GetFeeds.
func (mr *MockContentServiceClientMockRecorder) GetFeeds(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetFeeds", reflect.TypeOf((*MockContentServiceClient)(nil).GetFeeds), varargs...)
}

// GetUserSavedArticle mocks base method.
func (m *MockContentServiceClient) GetUserSavedArticle(arg0 context.Context, arg1 *content.GetUserSavedArticleRequest, arg2 ...grpc.CallOption) (*content.GetUserSavedArticleResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "GetUserSavedArticle", varargs...)
	ret0, _ := ret[0].(*content.GetUserSavedArticleResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetUserSavedArticle indicates an expected call of GetUserSavedArticle.
func (mr *MockContentServiceClientMockRecorder) GetUserSavedArticle(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetUserSavedArticle", reflect.TypeOf((*MockContentServiceClient)(nil).GetUserSavedArticle), varargs...)
}

// ListArticle mocks base method.
func (m *MockContentServiceClient) ListArticle(arg0 context.Context, arg1 *content.ListArticleRequest, arg2 ...grpc.CallOption) (*content.ListArticleResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "ListArticle", varargs...)
	ret0, _ := ret[0].(*content.ListArticleResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ListArticle indicates an expected call of ListArticle.
func (mr *MockContentServiceClientMockRecorder) ListArticle(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ListArticle", reflect.TypeOf((*MockContentServiceClient)(nil).ListArticle), varargs...)
}

// ListArticleByArticleURL mocks base method.
func (m *MockContentServiceClient) ListArticleByArticleURL(arg0 context.Context, arg1 *content.ListArticleByArticleURLRequest, arg2 ...grpc.CallOption) (*content.ListArticleByArticleURLResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "ListArticleByArticleURL", varargs...)
	ret0, _ := ret[0].(*content.ListArticleByArticleURLResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ListArticleByArticleURL indicates an expected call of ListArticleByArticleURL.
func (mr *MockContentServiceClientMockRecorder) ListArticleByArticleURL(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ListArticleByArticleURL", reflect.TypeOf((*MockContentServiceClient)(nil).ListArticleByArticleURL), varargs...)
}

// UpsertArticleComment mocks base method.
func (m *MockContentServiceClient) UpsertArticleComment(arg0 context.Context, arg1 *content.UpsertArticleCommentRequest, arg2 ...grpc.CallOption) (*content.UpsertArticleCommentResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "UpsertArticleComment", varargs...)
	ret0, _ := ret[0].(*content.UpsertArticleCommentResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpsertArticleComment indicates an expected call of UpsertArticleComment.
func (mr *MockContentServiceClientMockRecorder) UpsertArticleComment(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpsertArticleComment", reflect.TypeOf((*MockContentServiceClient)(nil).UpsertArticleComment), varargs...)
}

// MockContentServiceServer is a mock of ContentServiceServer interface.
type MockContentServiceServer struct {
	ctrl     *gomock.Controller
	recorder *MockContentServiceServerMockRecorder
}

// MockContentServiceServerMockRecorder is the mock recorder for MockContentServiceServer.
type MockContentServiceServerMockRecorder struct {
	mock *MockContentServiceServer
}

// NewMockContentServiceServer creates a new mock instance.
func NewMockContentServiceServer(ctrl *gomock.Controller) *MockContentServiceServer {
	mock := &MockContentServiceServer{ctrl: ctrl}
	mock.recorder = &MockContentServiceServerMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockContentServiceServer) EXPECT() *MockContentServiceServerMockRecorder {
	return m.recorder
}

// CreateUploadArticle mocks base method.
func (m *MockContentServiceServer) CreateUploadArticle(arg0 context.Context, arg1 *content.CreateUploadArticleRequest) (*content.CreateArticleResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateUploadArticle", arg0, arg1)
	ret0, _ := ret[0].(*content.CreateArticleResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateUploadArticle indicates an expected call of CreateUploadArticle.
func (mr *MockContentServiceServerMockRecorder) CreateUploadArticle(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateUploadArticle", reflect.TypeOf((*MockContentServiceServer)(nil).CreateUploadArticle), arg0, arg1)
}

// DeleteArticleComment mocks base method.
func (m *MockContentServiceServer) DeleteArticleComment(arg0 context.Context, arg1 *content.DeleteArticleCommentRequest) (*emptypb.Empty, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteArticleComment", arg0, arg1)
	ret0, _ := ret[0].(*emptypb.Empty)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// DeleteArticleComment indicates an expected call of DeleteArticleComment.
func (mr *MockContentServiceServerMockRecorder) DeleteArticleComment(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteArticleComment", reflect.TypeOf((*MockContentServiceServer)(nil).DeleteArticleComment), arg0, arg1)
}

// GetArticle mocks base method.
func (m *MockContentServiceServer) GetArticle(arg0 context.Context, arg1 *content.GetArticleRequest) (*content.GetArticleResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetArticle", arg0, arg1)
	ret0, _ := ret[0].(*content.GetArticleResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetArticle indicates an expected call of GetArticle.
func (mr *MockContentServiceServerMockRecorder) GetArticle(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetArticle", reflect.TypeOf((*MockContentServiceServer)(nil).GetArticle), arg0, arg1)
}

// GetArticleOGP mocks base method.
func (m *MockContentServiceServer) GetArticleOGP(arg0 context.Context, arg1 *content.GetArticleOGPRequest) (*content.GetArticleOGPResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetArticleOGP", arg0, arg1)
	ret0, _ := ret[0].(*content.GetArticleOGPResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetArticleOGP indicates an expected call of GetArticleOGP.
func (mr *MockContentServiceServerMockRecorder) GetArticleOGP(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetArticleOGP", reflect.TypeOf((*MockContentServiceServer)(nil).GetArticleOGP), arg0, arg1)
}

// GetFeed mocks base method.
func (m *MockContentServiceServer) GetFeed(arg0 context.Context, arg1 *content.GetFeedRequest) (*content.GetFeedResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetFeed", arg0, arg1)
	ret0, _ := ret[0].(*content.GetFeedResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetFeed indicates an expected call of GetFeed.
func (mr *MockContentServiceServerMockRecorder) GetFeed(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetFeed", reflect.TypeOf((*MockContentServiceServer)(nil).GetFeed), arg0, arg1)
}

// GetFeeds mocks base method.
func (m *MockContentServiceServer) GetFeeds(arg0 context.Context, arg1 *content.GetFeedsRequest) (*content.GetFeedsResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetFeeds", arg0, arg1)
	ret0, _ := ret[0].(*content.GetFeedsResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetFeeds indicates an expected call of GetFeeds.
func (mr *MockContentServiceServerMockRecorder) GetFeeds(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetFeeds", reflect.TypeOf((*MockContentServiceServer)(nil).GetFeeds), arg0, arg1)
}

// GetUserSavedArticle mocks base method.
func (m *MockContentServiceServer) GetUserSavedArticle(arg0 context.Context, arg1 *content.GetUserSavedArticleRequest) (*content.GetUserSavedArticleResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetUserSavedArticle", arg0, arg1)
	ret0, _ := ret[0].(*content.GetUserSavedArticleResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetUserSavedArticle indicates an expected call of GetUserSavedArticle.
func (mr *MockContentServiceServerMockRecorder) GetUserSavedArticle(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetUserSavedArticle", reflect.TypeOf((*MockContentServiceServer)(nil).GetUserSavedArticle), arg0, arg1)
}

// ListArticle mocks base method.
func (m *MockContentServiceServer) ListArticle(arg0 context.Context, arg1 *content.ListArticleRequest) (*content.ListArticleResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ListArticle", arg0, arg1)
	ret0, _ := ret[0].(*content.ListArticleResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ListArticle indicates an expected call of ListArticle.
func (mr *MockContentServiceServerMockRecorder) ListArticle(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ListArticle", reflect.TypeOf((*MockContentServiceServer)(nil).ListArticle), arg0, arg1)
}

// ListArticleByArticleURL mocks base method.
func (m *MockContentServiceServer) ListArticleByArticleURL(arg0 context.Context, arg1 *content.ListArticleByArticleURLRequest) (*content.ListArticleByArticleURLResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ListArticleByArticleURL", arg0, arg1)
	ret0, _ := ret[0].(*content.ListArticleByArticleURLResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ListArticleByArticleURL indicates an expected call of ListArticleByArticleURL.
func (mr *MockContentServiceServerMockRecorder) ListArticleByArticleURL(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ListArticleByArticleURL", reflect.TypeOf((*MockContentServiceServer)(nil).ListArticleByArticleURL), arg0, arg1)
}

// UpsertArticleComment mocks base method.
func (m *MockContentServiceServer) UpsertArticleComment(arg0 context.Context, arg1 *content.UpsertArticleCommentRequest) (*content.UpsertArticleCommentResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpsertArticleComment", arg0, arg1)
	ret0, _ := ret[0].(*content.UpsertArticleCommentResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpsertArticleComment indicates an expected call of UpsertArticleComment.
func (mr *MockContentServiceServerMockRecorder) UpsertArticleComment(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpsertArticleComment", reflect.TypeOf((*MockContentServiceServer)(nil).UpsertArticleComment), arg0, arg1)
}

// MockUnsafeContentServiceServer is a mock of UnsafeContentServiceServer interface.
type MockUnsafeContentServiceServer struct {
	ctrl     *gomock.Controller
	recorder *MockUnsafeContentServiceServerMockRecorder
}

// MockUnsafeContentServiceServerMockRecorder is the mock recorder for MockUnsafeContentServiceServer.
type MockUnsafeContentServiceServerMockRecorder struct {
	mock *MockUnsafeContentServiceServer
}

// NewMockUnsafeContentServiceServer creates a new mock instance.
func NewMockUnsafeContentServiceServer(ctrl *gomock.Controller) *MockUnsafeContentServiceServer {
	mock := &MockUnsafeContentServiceServer{ctrl: ctrl}
	mock.recorder = &MockUnsafeContentServiceServerMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockUnsafeContentServiceServer) EXPECT() *MockUnsafeContentServiceServerMockRecorder {
	return m.recorder
}

// mustEmbedUnimplementedContentServiceServer mocks base method.
func (m *MockUnsafeContentServiceServer) mustEmbedUnimplementedContentServiceServer() {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "mustEmbedUnimplementedContentServiceServer")
}

// mustEmbedUnimplementedContentServiceServer indicates an expected call of mustEmbedUnimplementedContentServiceServer.
func (mr *MockUnsafeContentServiceServerMockRecorder) mustEmbedUnimplementedContentServiceServer() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "mustEmbedUnimplementedContentServiceServer", reflect.TypeOf((*MockUnsafeContentServiceServer)(nil).mustEmbedUnimplementedContentServiceServer))
}
