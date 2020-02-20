package ems

import "net/url"

type ClientOptions struct {
	serverUrl url.URL
	username  string
	password  string
}

func NewClientOptions() *ClientOptions {
	o := &ClientOptions{
		username: "",
		password: "",
	}

	return o
}

func (o *ClientOptions) SetServerUrl(p string) *ClientOptions {

	url, err := url.Parse(p)
	if err == nil {
		o.serverUrl = *url
	}
	return o
}

func (o *ClientOptions) SetUsername(p string) *ClientOptions {
	o.username = p
	return o
}

func (o *ClientOptions) SetPassword(p string) *ClientOptions {
	o.password = p
	return o
}

func (o *ClientOptions) GetServerUrl() url.URL {
	return o.serverUrl
}

func (o *ClientOptions) GetUsername() string {
	return o.username
}

func (o *ClientOptions) GetPassword() string {
	return o.password
}
