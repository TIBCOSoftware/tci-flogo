package ems

import (
	"fmt"
	"testing"
)

func TestNewClient(t *testing.T) {

	ops := NewClientOptions().SetServerUrl("tcp://127.0.0.1:7222").SetUsername("admin").SetPassword("")

	c := NewClient(ops).(*Client)

	if c == nil {
		t.Fatalf("ops is nil")
	}

	if c.options.serverUrl.Host != "127.0.0.1:7222" {
		t.Fatalf("bad server host")
	}

	if c.options.serverUrl.Scheme != "tcp" {
		t.Fatalf("bad server scheme")
	}

	if c.options.username != "admin" {
		t.Fatalf("bad username")
	}

	if c.options.password != "" {
		t.Fatalf("bad password")
	}

}

func TestClient_Connect(t *testing.T) {

	ops := NewClientOptions().SetServerUrl("tcp://127.0.0.1:7222").SetUsername("admin").SetPassword("")

	c := NewClient(ops).(*Client)

	err := c.Connect()
	if err != nil {
		t.Fatalf(err.Error())
	}

	c.Disconnect()

}

func TestClient_Send(t *testing.T) {

	ops := NewClientOptions().SetServerUrl("tcp://127.0.0.1:7222").SetUsername("admin").SetPassword("")

	c := NewClient(ops).(*Client)

	err := c.Connect()
	if err != nil {
		t.Fatalf(err.Error())
	}

	err = c.Send("queue.sample", "queue", "hello, world", 0, "non_persistent", 10000)
	if err != nil {
		t.Fatalf(err.Error())
	}

	err = c.Disconnect()
	if err != nil {
		t.Fatalf(err.Error())
	}
}

func TestClient_SendReceive(t *testing.T) {

	ops := NewClientOptions().SetServerUrl("tcp://127.0.0.1:7222").SetUsername("admin").SetPassword("")

	c := NewClient(ops).(*Client)

	err := c.Connect()
	if err != nil {
		t.Fatalf(err.Error())
	}

	_, err = c.SendReceive("queue.sample", "queue", "hello, world", "non_persistent", 1000)
	if err != nil {
		t.Fatalf(err.Error())
	}

	err = c.Disconnect()
	if err != nil {
		t.Fatalf(err.Error())
	}

}

func TestClient_Receive(t *testing.T) {

	ops := NewClientOptions().SetServerUrl("tcp://127.0.0.1:7222").SetUsername("admin").SetPassword("")

	c := NewClient(ops).(*Client)

	err := c.Connect()
	if err != nil {
		t.Fatalf(err.Error())
	}

	msg, timeout, err := c.Receive("queue.sample", "queue", 1000)

	if err != nil {
		t.Fatalf(err.Error())
	}

	if timeout {
		fmt.Println("Timeout detected")
	}

	fmt.Println(msg)

	err = c.Disconnect()
	if err != nil {
		t.Fatalf(err.Error())
	}

}
