package usecase

import (
	"os"
	"testing"

	"github.com/YukiOnishi1129/techpicks/micro-service/content-service/internal/util/testutil"
)

func TestMain(m *testing.M) {
	testutil.BeforeAllTest()
	// This is a test runner
	os.Exit(m.Run())
}
