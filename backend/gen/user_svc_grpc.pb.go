// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             (unknown)
// source: user_svc.proto

package gen

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	UserService_RefreshToken_FullMethodName   = "/proto.UserService/RefreshToken"
	UserService_GetProfile_FullMethodName     = "/proto.UserService/GetProfile"
	UserService_UpdateProfile_FullMethodName  = "/proto.UserService/UpdateProfile"
	UserService_Logout_FullMethodName         = "/proto.UserService/Logout"
	UserService_GetUsers_FullMethodName       = "/proto.UserService/GetUsers"
	UserService_GetUserById_FullMethodName    = "/proto.UserService/GetUserById"
	UserService_UpdatePosition_FullMethodName = "/proto.UserService/UpdatePosition"
	UserService_DeleteUser_FullMethodName     = "/proto.UserService/DeleteUser"
)

// UserServiceClient is the client API for UserService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type UserServiceClient interface {
	// Refresh a user's token
	RefreshToken(ctx context.Context, in *EmptyRequest, opts ...grpc.CallOption) (*LoginResponse, error)
	// Get a user's profile
	GetProfile(ctx context.Context, in *EmptyRequest, opts ...grpc.CallOption) (*GetProfileResponse, error)
	// Update a user's profile
	UpdateProfile(ctx context.Context, in *UpdateProfileRequest, opts ...grpc.CallOption) (*SuccessMessageResponse, error)
	Logout(ctx context.Context, in *LogoutRequest, opts ...grpc.CallOption) (*LogoutResponse, error)
	GetUsers(ctx context.Context, in *EmptyRequest, opts ...grpc.CallOption) (*GetUsersResponse, error)
	GetUserById(ctx context.Context, in *GetUserByIdRequest, opts ...grpc.CallOption) (*GetProfileResponse, error)
	UpdatePosition(ctx context.Context, in *UpdatePositionRequest, opts ...grpc.CallOption) (*SuccessMessageResponse, error)
	DeleteUser(ctx context.Context, in *DeleteUserRequest, opts ...grpc.CallOption) (*SuccessMessageResponse, error)
}

type userServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewUserServiceClient(cc grpc.ClientConnInterface) UserServiceClient {
	return &userServiceClient{cc}
}

func (c *userServiceClient) RefreshToken(ctx context.Context, in *EmptyRequest, opts ...grpc.CallOption) (*LoginResponse, error) {
	out := new(LoginResponse)
	err := c.cc.Invoke(ctx, UserService_RefreshToken_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userServiceClient) GetProfile(ctx context.Context, in *EmptyRequest, opts ...grpc.CallOption) (*GetProfileResponse, error) {
	out := new(GetProfileResponse)
	err := c.cc.Invoke(ctx, UserService_GetProfile_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userServiceClient) UpdateProfile(ctx context.Context, in *UpdateProfileRequest, opts ...grpc.CallOption) (*SuccessMessageResponse, error) {
	out := new(SuccessMessageResponse)
	err := c.cc.Invoke(ctx, UserService_UpdateProfile_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userServiceClient) Logout(ctx context.Context, in *LogoutRequest, opts ...grpc.CallOption) (*LogoutResponse, error) {
	out := new(LogoutResponse)
	err := c.cc.Invoke(ctx, UserService_Logout_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userServiceClient) GetUsers(ctx context.Context, in *EmptyRequest, opts ...grpc.CallOption) (*GetUsersResponse, error) {
	out := new(GetUsersResponse)
	err := c.cc.Invoke(ctx, UserService_GetUsers_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userServiceClient) GetUserById(ctx context.Context, in *GetUserByIdRequest, opts ...grpc.CallOption) (*GetProfileResponse, error) {
	out := new(GetProfileResponse)
	err := c.cc.Invoke(ctx, UserService_GetUserById_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userServiceClient) UpdatePosition(ctx context.Context, in *UpdatePositionRequest, opts ...grpc.CallOption) (*SuccessMessageResponse, error) {
	out := new(SuccessMessageResponse)
	err := c.cc.Invoke(ctx, UserService_UpdatePosition_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userServiceClient) DeleteUser(ctx context.Context, in *DeleteUserRequest, opts ...grpc.CallOption) (*SuccessMessageResponse, error) {
	out := new(SuccessMessageResponse)
	err := c.cc.Invoke(ctx, UserService_DeleteUser_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// UserServiceServer is the server API for UserService service.
// All implementations should embed UnimplementedUserServiceServer
// for forward compatibility
type UserServiceServer interface {
	// Refresh a user's token
	RefreshToken(context.Context, *EmptyRequest) (*LoginResponse, error)
	// Get a user's profile
	GetProfile(context.Context, *EmptyRequest) (*GetProfileResponse, error)
	// Update a user's profile
	UpdateProfile(context.Context, *UpdateProfileRequest) (*SuccessMessageResponse, error)
	Logout(context.Context, *LogoutRequest) (*LogoutResponse, error)
	GetUsers(context.Context, *EmptyRequest) (*GetUsersResponse, error)
	GetUserById(context.Context, *GetUserByIdRequest) (*GetProfileResponse, error)
	UpdatePosition(context.Context, *UpdatePositionRequest) (*SuccessMessageResponse, error)
	DeleteUser(context.Context, *DeleteUserRequest) (*SuccessMessageResponse, error)
}

// UnimplementedUserServiceServer should be embedded to have forward compatible implementations.
type UnimplementedUserServiceServer struct {
}

func (UnimplementedUserServiceServer) RefreshToken(context.Context, *EmptyRequest) (*LoginResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RefreshToken not implemented")
}
func (UnimplementedUserServiceServer) GetProfile(context.Context, *EmptyRequest) (*GetProfileResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetProfile not implemented")
}
func (UnimplementedUserServiceServer) UpdateProfile(context.Context, *UpdateProfileRequest) (*SuccessMessageResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateProfile not implemented")
}
func (UnimplementedUserServiceServer) Logout(context.Context, *LogoutRequest) (*LogoutResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Logout not implemented")
}
func (UnimplementedUserServiceServer) GetUsers(context.Context, *EmptyRequest) (*GetUsersResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetUsers not implemented")
}
func (UnimplementedUserServiceServer) GetUserById(context.Context, *GetUserByIdRequest) (*GetProfileResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetUserById not implemented")
}
func (UnimplementedUserServiceServer) UpdatePosition(context.Context, *UpdatePositionRequest) (*SuccessMessageResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdatePosition not implemented")
}
func (UnimplementedUserServiceServer) DeleteUser(context.Context, *DeleteUserRequest) (*SuccessMessageResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteUser not implemented")
}

// UnsafeUserServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to UserServiceServer will
// result in compilation errors.
type UnsafeUserServiceServer interface {
	mustEmbedUnimplementedUserServiceServer()
}

func RegisterUserServiceServer(s grpc.ServiceRegistrar, srv UserServiceServer) {
	s.RegisterService(&UserService_ServiceDesc, srv)
}

func _UserService_RefreshToken_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(EmptyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UserServiceServer).RefreshToken(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UserService_RefreshToken_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UserServiceServer).RefreshToken(ctx, req.(*EmptyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UserService_GetProfile_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(EmptyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UserServiceServer).GetProfile(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UserService_GetProfile_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UserServiceServer).GetProfile(ctx, req.(*EmptyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UserService_UpdateProfile_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UpdateProfileRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UserServiceServer).UpdateProfile(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UserService_UpdateProfile_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UserServiceServer).UpdateProfile(ctx, req.(*UpdateProfileRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UserService_Logout_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(LogoutRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UserServiceServer).Logout(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UserService_Logout_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UserServiceServer).Logout(ctx, req.(*LogoutRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UserService_GetUsers_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(EmptyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UserServiceServer).GetUsers(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UserService_GetUsers_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UserServiceServer).GetUsers(ctx, req.(*EmptyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UserService_GetUserById_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetUserByIdRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UserServiceServer).GetUserById(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UserService_GetUserById_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UserServiceServer).GetUserById(ctx, req.(*GetUserByIdRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UserService_UpdatePosition_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UpdatePositionRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UserServiceServer).UpdatePosition(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UserService_UpdatePosition_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UserServiceServer).UpdatePosition(ctx, req.(*UpdatePositionRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UserService_DeleteUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(DeleteUserRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UserServiceServer).DeleteUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UserService_DeleteUser_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UserServiceServer).DeleteUser(ctx, req.(*DeleteUserRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// UserService_ServiceDesc is the grpc.ServiceDesc for UserService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var UserService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "proto.UserService",
	HandlerType: (*UserServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "RefreshToken",
			Handler:    _UserService_RefreshToken_Handler,
		},
		{
			MethodName: "GetProfile",
			Handler:    _UserService_GetProfile_Handler,
		},
		{
			MethodName: "UpdateProfile",
			Handler:    _UserService_UpdateProfile_Handler,
		},
		{
			MethodName: "Logout",
			Handler:    _UserService_Logout_Handler,
		},
		{
			MethodName: "GetUsers",
			Handler:    _UserService_GetUsers_Handler,
		},
		{
			MethodName: "GetUserById",
			Handler:    _UserService_GetUserById_Handler,
		},
		{
			MethodName: "UpdatePosition",
			Handler:    _UserService_UpdatePosition_Handler,
		},
		{
			MethodName: "DeleteUser",
			Handler:    _UserService_DeleteUser_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "user_svc.proto",
}
