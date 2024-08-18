package serializers

type UserInfo struct {
	ID    string `json:"ID"`
	Email string `json:"Email"`
}

type ClubInfo struct {
	ID       string `json:"ID"`
	NameClub string `json:"NameClub"`
	OwnerBy  string `json:"OwnerBy"`
}
