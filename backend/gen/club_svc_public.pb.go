// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        (unknown)
// source: club_svc_public.proto

package gen

import (
	_ "google.golang.org/genproto/googleapis/api/annotations"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

var File_club_svc_public_proto protoreflect.FileDescriptor

var file_club_svc_public_proto_rawDesc = []byte{
	0x0a, 0x15, 0x63, 0x6c, 0x75, 0x62, 0x5f, 0x73, 0x76, 0x63, 0x5f, 0x70, 0x75, 0x62, 0x6c, 0x69,
	0x63, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x05, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1c,
	0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x61, 0x6e, 0x6e, 0x6f, 0x74,
	0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x0d, 0x6d, 0x65,
	0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x0a, 0x75, 0x73, 0x65,
	0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x0a, 0x63, 0x6c, 0x75, 0x62, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x32, 0x8a, 0x04, 0x0a, 0x11, 0x43, 0x6c, 0x75, 0x62, 0x53, 0x65, 0x72, 0x76,
	0x69, 0x63, 0x65, 0x50, 0x75, 0x62, 0x6c, 0x69, 0x63, 0x12, 0x5e, 0x0a, 0x0e, 0x47, 0x65, 0x74,
	0x43, 0x6c, 0x75, 0x62, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x12, 0x15, 0x2e, 0x43, 0x6c,
	0x75, 0x62, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x49, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x14, 0x2e, 0x43, 0x6c, 0x75, 0x62, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x1f, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x19,
	0x12, 0x17, 0x2f, 0x63, 0x6c, 0x75, 0x62, 0x2d, 0x70, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x2f,
	0x7b, 0x69, 0x64, 0x5f, 0x63, 0x6c, 0x75, 0x62, 0x7d, 0x12, 0x6e, 0x0a, 0x16, 0x47, 0x65, 0x74,
	0x50, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x42, 0x79, 0x43,
	0x6c, 0x75, 0x62, 0x12, 0x15, 0x2e, 0x43, 0x6c, 0x75, 0x62, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c,
	0x65, 0x49, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1a, 0x2e, 0x50, 0x6c, 0x61,
	0x79, 0x65, 0x72, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x21, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x1b, 0x12, 0x19,
	0x2f, 0x70, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x2d, 0x70, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x2f,
	0x7b, 0x69, 0x64, 0x5f, 0x63, 0x6c, 0x75, 0x62, 0x7d, 0x12, 0x6b, 0x0a, 0x1a, 0x47, 0x65, 0x74,
	0x43, 0x6c, 0x75, 0x62, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x4c, 0x69, 0x73, 0x74, 0x42,
	0x79, 0x53, 0x65, 0x61, 0x53, 0x6f, 0x6e, 0x12, 0x15, 0x2e, 0x43, 0x6c, 0x75, 0x62, 0x50, 0x72,
	0x6f, 0x66, 0x69, 0x6c, 0x65, 0x49, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x18,
	0x2e, 0x43, 0x6c, 0x75, 0x62, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x4c, 0x69, 0x73, 0x74,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x1c, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x16,
	0x12, 0x14, 0x2f, 0x63, 0x6c, 0x75, 0x62, 0x2d, 0x6c, 0x69, 0x73, 0x74, 0x2f, 0x7b, 0x73, 0x65,
	0x61, 0x5f, 0x73, 0x6f, 0x6e, 0x7d, 0x12, 0x55, 0x0a, 0x10, 0x47, 0x65, 0x74, 0x50, 0x6c, 0x61,
	0x79, 0x65, 0x72, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x12, 0x0e, 0x2e, 0x50, 0x4c, 0x61,
	0x79, 0x65, 0x72, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x16, 0x2e, 0x50, 0x4c, 0x61,
	0x79, 0x65, 0x72, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x22, 0x19, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x13, 0x12, 0x11, 0x2f, 0x63, 0x6c, 0x75,
	0x62, 0x2f, 0x70, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x2f, 0x7b, 0x69, 0x64, 0x7d, 0x12, 0x61, 0x0a,
	0x12, 0x47, 0x65, 0x74, 0x41, 0x6c, 0x6c, 0x43, 0x6f, 0x61, 0x63, 0x68, 0x50, 0x72, 0x6f, 0x66,
	0x69, 0x6c, 0x65, 0x12, 0x11, 0x2e, 0x43, 0x6f, 0x61, 0x63, 0x68, 0x43, 0x6c, 0x75, 0x62, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x19, 0x2e, 0x43, 0x6f, 0x61, 0x63, 0x68, 0x50, 0x72,
	0x6f, 0x66, 0x69, 0x6c, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x4c, 0x69, 0x73,
	0x74, 0x22, 0x1d, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x17, 0x12, 0x15, 0x2f, 0x63, 0x6c, 0x75, 0x62,
	0x2f, 0x63, 0x6f, 0x61, 0x63, 0x68, 0x2f, 0x7b, 0x63, 0x6c, 0x75, 0x62, 0x5f, 0x69, 0x64, 0x7d,
	0x42, 0x7b, 0x0a, 0x09, 0x63, 0x6f, 0x6d, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x42, 0x12, 0x43,
	0x6c, 0x75, 0x62, 0x53, 0x76, 0x63, 0x50, 0x75, 0x62, 0x6c, 0x69, 0x63, 0x50, 0x72, 0x6f, 0x74,
	0x6f, 0x50, 0x01, 0x5a, 0x26, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f,
	0x4e, 0x4d, 0x43, 0x4e, 0x50, 0x4d, 0x2d, 0x66, 0x6f, 0x6f, 0x74, 0x62, 0x61, 0x6c, 0x6c, 0x2f,
	0x62, 0x61, 0x63, 0x6b, 0x65, 0x6e, 0x64, 0x2f, 0x67, 0x65, 0x6e, 0xa2, 0x02, 0x03, 0x50, 0x58,
	0x58, 0xaa, 0x02, 0x05, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0xca, 0x02, 0x05, 0x50, 0x72, 0x6f, 0x74,
	0x6f, 0xe2, 0x02, 0x11, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74,
	0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x05, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var file_club_svc_public_proto_goTypes = []interface{}{
	(*ClubProfileIdRequest)(nil),      // 0: ClubProfileIdRequest
	(*PLayerRequest)(nil),             // 1: PLayerRequest
	(*CoachClubRequest)(nil),          // 2: CoachClubRequest
	(*ClubProfileResponse)(nil),       // 3: ClubProfileResponse
	(*PlayerProfileListResponse)(nil), // 4: PlayerProfileListResponse
	(*ClubProfileListResponse)(nil),   // 5: ClubProfileListResponse
	(*PLayerProfileResponse)(nil),     // 6: PLayerProfileResponse
	(*CoachProfileResponseList)(nil),  // 7: CoachProfileResponseList
}
var file_club_svc_public_proto_depIdxs = []int32{
	0, // 0: proto.ClubServicePublic.GetClubProfile:input_type -> ClubProfileIdRequest
	0, // 1: proto.ClubServicePublic.GetPlayerProfileByClub:input_type -> ClubProfileIdRequest
	0, // 2: proto.ClubServicePublic.GetClubProfileListBySeaSon:input_type -> ClubProfileIdRequest
	1, // 3: proto.ClubServicePublic.GetPlayerProfile:input_type -> PLayerRequest
	2, // 4: proto.ClubServicePublic.GetAllCoachProfile:input_type -> CoachClubRequest
	3, // 5: proto.ClubServicePublic.GetClubProfile:output_type -> ClubProfileResponse
	4, // 6: proto.ClubServicePublic.GetPlayerProfileByClub:output_type -> PlayerProfileListResponse
	5, // 7: proto.ClubServicePublic.GetClubProfileListBySeaSon:output_type -> ClubProfileListResponse
	6, // 8: proto.ClubServicePublic.GetPlayerProfile:output_type -> PLayerProfileResponse
	7, // 9: proto.ClubServicePublic.GetAllCoachProfile:output_type -> CoachProfileResponseList
	5, // [5:10] is the sub-list for method output_type
	0, // [0:5] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_club_svc_public_proto_init() }
func file_club_svc_public_proto_init() {
	if File_club_svc_public_proto != nil {
		return
	}
	file_message_proto_init()
	file_user_proto_init()
	file_club_proto_init()
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_club_svc_public_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   0,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_club_svc_public_proto_goTypes,
		DependencyIndexes: file_club_svc_public_proto_depIdxs,
	}.Build()
	File_club_svc_public_proto = out.File
	file_club_svc_public_proto_rawDesc = nil
	file_club_svc_public_proto_goTypes = nil
	file_club_svc_public_proto_depIdxs = nil
}
