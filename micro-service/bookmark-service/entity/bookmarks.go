// Code generated by SQLBoiler 4.16.2 (https://github.com/volatiletech/sqlboiler). DO NOT EDIT.
// This file is meant to be re-generated in place and/or deleted at any time.

package entity

import (
	"context"
	"database/sql"
	"fmt"
	"reflect"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/friendsofgo/errors"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"github.com/volatiletech/sqlboiler/v4/queries/qmhelper"
	"github.com/volatiletech/strmangle"
)

// Bookmark is an object representing the database table.
type Bookmark struct {
	ID                 string      `boil:"id" json:"id" toml:"id" yaml:"id"`
	UserID             string      `boil:"user_id" json:"user_id" toml:"user_id" yaml:"user_id"`
	PlatformID         null.String `boil:"platform_id" json:"platform_id,omitempty" toml:"platform_id" yaml:"platform_id,omitempty"`
	ArticleID          string      `boil:"article_id" json:"article_id" toml:"article_id" yaml:"article_id"`
	Title              string      `boil:"title" json:"title" toml:"title" yaml:"title"`
	Description        string      `boil:"description" json:"description" toml:"description" yaml:"description"`
	ArticleURL         string      `boil:"article_url" json:"article_url" toml:"article_url" yaml:"article_url"`
	PublishedAt        null.Time   `boil:"published_at" json:"published_at,omitempty" toml:"published_at" yaml:"published_at,omitempty"`
	ThumbnailURL       string      `boil:"thumbnail_url" json:"thumbnail_url" toml:"thumbnail_url" yaml:"thumbnail_url"`
	PlatformName       string      `boil:"platform_name" json:"platform_name" toml:"platform_name" yaml:"platform_name"`
	PlatformURL        string      `boil:"platform_url" json:"platform_url" toml:"platform_url" yaml:"platform_url"`
	PlatformFaviconURL string      `boil:"platform_favicon_url" json:"platform_favicon_url" toml:"platform_favicon_url" yaml:"platform_favicon_url"`
	IsEng              bool        `boil:"is_eng" json:"is_eng" toml:"is_eng" yaml:"is_eng"`
	IsRead             bool        `boil:"is_read" json:"is_read" toml:"is_read" yaml:"is_read"`
	CreatedAt          time.Time   `boil:"created_at" json:"created_at" toml:"created_at" yaml:"created_at"`
	UpdatedAt          time.Time   `boil:"updated_at" json:"updated_at" toml:"updated_at" yaml:"updated_at"`

	R *bookmarkR `boil:"-" json:"-" toml:"-" yaml:"-"`
	L bookmarkL  `boil:"-" json:"-" toml:"-" yaml:"-"`
}

var BookmarkColumns = struct {
	ID                 string
	UserID             string
	PlatformID         string
	ArticleID          string
	Title              string
	Description        string
	ArticleURL         string
	PublishedAt        string
	ThumbnailURL       string
	PlatformName       string
	PlatformURL        string
	PlatformFaviconURL string
	IsEng              string
	IsRead             string
	CreatedAt          string
	UpdatedAt          string
}{
	ID:                 "id",
	UserID:             "user_id",
	PlatformID:         "platform_id",
	ArticleID:          "article_id",
	Title:              "title",
	Description:        "description",
	ArticleURL:         "article_url",
	PublishedAt:        "published_at",
	ThumbnailURL:       "thumbnail_url",
	PlatformName:       "platform_name",
	PlatformURL:        "platform_url",
	PlatformFaviconURL: "platform_favicon_url",
	IsEng:              "is_eng",
	IsRead:             "is_read",
	CreatedAt:          "created_at",
	UpdatedAt:          "updated_at",
}

var BookmarkTableColumns = struct {
	ID                 string
	UserID             string
	PlatformID         string
	ArticleID          string
	Title              string
	Description        string
	ArticleURL         string
	PublishedAt        string
	ThumbnailURL       string
	PlatformName       string
	PlatformURL        string
	PlatformFaviconURL string
	IsEng              string
	IsRead             string
	CreatedAt          string
	UpdatedAt          string
}{
	ID:                 "bookmarks.id",
	UserID:             "bookmarks.user_id",
	PlatformID:         "bookmarks.platform_id",
	ArticleID:          "bookmarks.article_id",
	Title:              "bookmarks.title",
	Description:        "bookmarks.description",
	ArticleURL:         "bookmarks.article_url",
	PublishedAt:        "bookmarks.published_at",
	ThumbnailURL:       "bookmarks.thumbnail_url",
	PlatformName:       "bookmarks.platform_name",
	PlatformURL:        "bookmarks.platform_url",
	PlatformFaviconURL: "bookmarks.platform_favicon_url",
	IsEng:              "bookmarks.is_eng",
	IsRead:             "bookmarks.is_read",
	CreatedAt:          "bookmarks.created_at",
	UpdatedAt:          "bookmarks.updated_at",
}

// Generated where

type whereHelperstring struct{ field string }

func (w whereHelperstring) EQ(x string) qm.QueryMod     { return qmhelper.Where(w.field, qmhelper.EQ, x) }
func (w whereHelperstring) NEQ(x string) qm.QueryMod    { return qmhelper.Where(w.field, qmhelper.NEQ, x) }
func (w whereHelperstring) LT(x string) qm.QueryMod     { return qmhelper.Where(w.field, qmhelper.LT, x) }
func (w whereHelperstring) LTE(x string) qm.QueryMod    { return qmhelper.Where(w.field, qmhelper.LTE, x) }
func (w whereHelperstring) GT(x string) qm.QueryMod     { return qmhelper.Where(w.field, qmhelper.GT, x) }
func (w whereHelperstring) GTE(x string) qm.QueryMod    { return qmhelper.Where(w.field, qmhelper.GTE, x) }
func (w whereHelperstring) LIKE(x string) qm.QueryMod   { return qm.Where(w.field+" LIKE ?", x) }
func (w whereHelperstring) NLIKE(x string) qm.QueryMod  { return qm.Where(w.field+" NOT LIKE ?", x) }
func (w whereHelperstring) ILIKE(x string) qm.QueryMod  { return qm.Where(w.field+" ILIKE ?", x) }
func (w whereHelperstring) NILIKE(x string) qm.QueryMod { return qm.Where(w.field+" NOT ILIKE ?", x) }
func (w whereHelperstring) IN(slice []string) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereIn(fmt.Sprintf("%s IN ?", w.field), values...)
}
func (w whereHelperstring) NIN(slice []string) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereNotIn(fmt.Sprintf("%s NOT IN ?", w.field), values...)
}

type whereHelpernull_String struct{ field string }

func (w whereHelpernull_String) EQ(x null.String) qm.QueryMod {
	return qmhelper.WhereNullEQ(w.field, false, x)
}
func (w whereHelpernull_String) NEQ(x null.String) qm.QueryMod {
	return qmhelper.WhereNullEQ(w.field, true, x)
}
func (w whereHelpernull_String) LT(x null.String) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LT, x)
}
func (w whereHelpernull_String) LTE(x null.String) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LTE, x)
}
func (w whereHelpernull_String) GT(x null.String) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GT, x)
}
func (w whereHelpernull_String) GTE(x null.String) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GTE, x)
}
func (w whereHelpernull_String) LIKE(x null.String) qm.QueryMod {
	return qm.Where(w.field+" LIKE ?", x)
}
func (w whereHelpernull_String) NLIKE(x null.String) qm.QueryMod {
	return qm.Where(w.field+" NOT LIKE ?", x)
}
func (w whereHelpernull_String) ILIKE(x null.String) qm.QueryMod {
	return qm.Where(w.field+" ILIKE ?", x)
}
func (w whereHelpernull_String) NILIKE(x null.String) qm.QueryMod {
	return qm.Where(w.field+" NOT ILIKE ?", x)
}
func (w whereHelpernull_String) IN(slice []string) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereIn(fmt.Sprintf("%s IN ?", w.field), values...)
}
func (w whereHelpernull_String) NIN(slice []string) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereNotIn(fmt.Sprintf("%s NOT IN ?", w.field), values...)
}

func (w whereHelpernull_String) IsNull() qm.QueryMod    { return qmhelper.WhereIsNull(w.field) }
func (w whereHelpernull_String) IsNotNull() qm.QueryMod { return qmhelper.WhereIsNotNull(w.field) }

type whereHelpernull_Time struct{ field string }

func (w whereHelpernull_Time) EQ(x null.Time) qm.QueryMod {
	return qmhelper.WhereNullEQ(w.field, false, x)
}
func (w whereHelpernull_Time) NEQ(x null.Time) qm.QueryMod {
	return qmhelper.WhereNullEQ(w.field, true, x)
}
func (w whereHelpernull_Time) LT(x null.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LT, x)
}
func (w whereHelpernull_Time) LTE(x null.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LTE, x)
}
func (w whereHelpernull_Time) GT(x null.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GT, x)
}
func (w whereHelpernull_Time) GTE(x null.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GTE, x)
}

func (w whereHelpernull_Time) IsNull() qm.QueryMod    { return qmhelper.WhereIsNull(w.field) }
func (w whereHelpernull_Time) IsNotNull() qm.QueryMod { return qmhelper.WhereIsNotNull(w.field) }

type whereHelperbool struct{ field string }

func (w whereHelperbool) EQ(x bool) qm.QueryMod  { return qmhelper.Where(w.field, qmhelper.EQ, x) }
func (w whereHelperbool) NEQ(x bool) qm.QueryMod { return qmhelper.Where(w.field, qmhelper.NEQ, x) }
func (w whereHelperbool) LT(x bool) qm.QueryMod  { return qmhelper.Where(w.field, qmhelper.LT, x) }
func (w whereHelperbool) LTE(x bool) qm.QueryMod { return qmhelper.Where(w.field, qmhelper.LTE, x) }
func (w whereHelperbool) GT(x bool) qm.QueryMod  { return qmhelper.Where(w.field, qmhelper.GT, x) }
func (w whereHelperbool) GTE(x bool) qm.QueryMod { return qmhelper.Where(w.field, qmhelper.GTE, x) }

type whereHelpertime_Time struct{ field string }

func (w whereHelpertime_Time) EQ(x time.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.EQ, x)
}
func (w whereHelpertime_Time) NEQ(x time.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.NEQ, x)
}
func (w whereHelpertime_Time) LT(x time.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LT, x)
}
func (w whereHelpertime_Time) LTE(x time.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LTE, x)
}
func (w whereHelpertime_Time) GT(x time.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GT, x)
}
func (w whereHelpertime_Time) GTE(x time.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GTE, x)
}

var BookmarkWhere = struct {
	ID                 whereHelperstring
	UserID             whereHelperstring
	PlatformID         whereHelpernull_String
	ArticleID          whereHelperstring
	Title              whereHelperstring
	Description        whereHelperstring
	ArticleURL         whereHelperstring
	PublishedAt        whereHelpernull_Time
	ThumbnailURL       whereHelperstring
	PlatformName       whereHelperstring
	PlatformURL        whereHelperstring
	PlatformFaviconURL whereHelperstring
	IsEng              whereHelperbool
	IsRead             whereHelperbool
	CreatedAt          whereHelpertime_Time
	UpdatedAt          whereHelpertime_Time
}{
	ID:                 whereHelperstring{field: "\"bookmarks\".\"id\""},
	UserID:             whereHelperstring{field: "\"bookmarks\".\"user_id\""},
	PlatformID:         whereHelpernull_String{field: "\"bookmarks\".\"platform_id\""},
	ArticleID:          whereHelperstring{field: "\"bookmarks\".\"article_id\""},
	Title:              whereHelperstring{field: "\"bookmarks\".\"title\""},
	Description:        whereHelperstring{field: "\"bookmarks\".\"description\""},
	ArticleURL:         whereHelperstring{field: "\"bookmarks\".\"article_url\""},
	PublishedAt:        whereHelpernull_Time{field: "\"bookmarks\".\"published_at\""},
	ThumbnailURL:       whereHelperstring{field: "\"bookmarks\".\"thumbnail_url\""},
	PlatformName:       whereHelperstring{field: "\"bookmarks\".\"platform_name\""},
	PlatformURL:        whereHelperstring{field: "\"bookmarks\".\"platform_url\""},
	PlatformFaviconURL: whereHelperstring{field: "\"bookmarks\".\"platform_favicon_url\""},
	IsEng:              whereHelperbool{field: "\"bookmarks\".\"is_eng\""},
	IsRead:             whereHelperbool{field: "\"bookmarks\".\"is_read\""},
	CreatedAt:          whereHelpertime_Time{field: "\"bookmarks\".\"created_at\""},
	UpdatedAt:          whereHelpertime_Time{field: "\"bookmarks\".\"updated_at\""},
}

// BookmarkRels is where relationship names are stored.
var BookmarkRels = struct {
}{}

// bookmarkR is where relationships are stored.
type bookmarkR struct {
}

// NewStruct creates a new relationship struct
func (*bookmarkR) NewStruct() *bookmarkR {
	return &bookmarkR{}
}

// bookmarkL is where Load methods for each relationship are stored.
type bookmarkL struct{}

var (
	bookmarkAllColumns            = []string{"id", "user_id", "platform_id", "article_id", "title", "description", "article_url", "published_at", "thumbnail_url", "platform_name", "platform_url", "platform_favicon_url", "is_eng", "is_read", "created_at", "updated_at"}
	bookmarkColumnsWithoutDefault = []string{"user_id", "article_id", "title", "description", "article_url", "thumbnail_url", "platform_name", "platform_url", "platform_favicon_url"}
	bookmarkColumnsWithDefault    = []string{"id", "platform_id", "published_at", "is_eng", "is_read", "created_at", "updated_at"}
	bookmarkPrimaryKeyColumns     = []string{"id"}
	bookmarkGeneratedColumns      = []string{}
)

type (
	// BookmarkSlice is an alias for a slice of pointers to Bookmark.
	// This should almost always be used instead of []Bookmark.
	BookmarkSlice []*Bookmark
	// BookmarkHook is the signature for custom Bookmark hook methods
	BookmarkHook func(context.Context, boil.ContextExecutor, *Bookmark) error

	bookmarkQuery struct {
		*queries.Query
	}
)

// Cache for insert, update and upsert
var (
	bookmarkType                 = reflect.TypeOf(&Bookmark{})
	bookmarkMapping              = queries.MakeStructMapping(bookmarkType)
	bookmarkPrimaryKeyMapping, _ = queries.BindMapping(bookmarkType, bookmarkMapping, bookmarkPrimaryKeyColumns)
	bookmarkInsertCacheMut       sync.RWMutex
	bookmarkInsertCache          = make(map[string]insertCache)
	bookmarkUpdateCacheMut       sync.RWMutex
	bookmarkUpdateCache          = make(map[string]updateCache)
	bookmarkUpsertCacheMut       sync.RWMutex
	bookmarkUpsertCache          = make(map[string]insertCache)
)

var (
	// Force time package dependency for automated UpdatedAt/CreatedAt.
	_ = time.Second
	// Force qmhelper dependency for where clause generation (which doesn't
	// always happen)
	_ = qmhelper.Where
)

var bookmarkAfterSelectMu sync.Mutex
var bookmarkAfterSelectHooks []BookmarkHook

var bookmarkBeforeInsertMu sync.Mutex
var bookmarkBeforeInsertHooks []BookmarkHook
var bookmarkAfterInsertMu sync.Mutex
var bookmarkAfterInsertHooks []BookmarkHook

var bookmarkBeforeUpdateMu sync.Mutex
var bookmarkBeforeUpdateHooks []BookmarkHook
var bookmarkAfterUpdateMu sync.Mutex
var bookmarkAfterUpdateHooks []BookmarkHook

var bookmarkBeforeDeleteMu sync.Mutex
var bookmarkBeforeDeleteHooks []BookmarkHook
var bookmarkAfterDeleteMu sync.Mutex
var bookmarkAfterDeleteHooks []BookmarkHook

var bookmarkBeforeUpsertMu sync.Mutex
var bookmarkBeforeUpsertHooks []BookmarkHook
var bookmarkAfterUpsertMu sync.Mutex
var bookmarkAfterUpsertHooks []BookmarkHook

// doAfterSelectHooks executes all "after Select" hooks.
func (o *Bookmark) doAfterSelectHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range bookmarkAfterSelectHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeInsertHooks executes all "before insert" hooks.
func (o *Bookmark) doBeforeInsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range bookmarkBeforeInsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterInsertHooks executes all "after Insert" hooks.
func (o *Bookmark) doAfterInsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range bookmarkAfterInsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeUpdateHooks executes all "before Update" hooks.
func (o *Bookmark) doBeforeUpdateHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range bookmarkBeforeUpdateHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterUpdateHooks executes all "after Update" hooks.
func (o *Bookmark) doAfterUpdateHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range bookmarkAfterUpdateHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeDeleteHooks executes all "before Delete" hooks.
func (o *Bookmark) doBeforeDeleteHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range bookmarkBeforeDeleteHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterDeleteHooks executes all "after Delete" hooks.
func (o *Bookmark) doAfterDeleteHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range bookmarkAfterDeleteHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeUpsertHooks executes all "before Upsert" hooks.
func (o *Bookmark) doBeforeUpsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range bookmarkBeforeUpsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterUpsertHooks executes all "after Upsert" hooks.
func (o *Bookmark) doAfterUpsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range bookmarkAfterUpsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// AddBookmarkHook registers your hook function for all future operations.
func AddBookmarkHook(hookPoint boil.HookPoint, bookmarkHook BookmarkHook) {
	switch hookPoint {
	case boil.AfterSelectHook:
		bookmarkAfterSelectMu.Lock()
		bookmarkAfterSelectHooks = append(bookmarkAfterSelectHooks, bookmarkHook)
		bookmarkAfterSelectMu.Unlock()
	case boil.BeforeInsertHook:
		bookmarkBeforeInsertMu.Lock()
		bookmarkBeforeInsertHooks = append(bookmarkBeforeInsertHooks, bookmarkHook)
		bookmarkBeforeInsertMu.Unlock()
	case boil.AfterInsertHook:
		bookmarkAfterInsertMu.Lock()
		bookmarkAfterInsertHooks = append(bookmarkAfterInsertHooks, bookmarkHook)
		bookmarkAfterInsertMu.Unlock()
	case boil.BeforeUpdateHook:
		bookmarkBeforeUpdateMu.Lock()
		bookmarkBeforeUpdateHooks = append(bookmarkBeforeUpdateHooks, bookmarkHook)
		bookmarkBeforeUpdateMu.Unlock()
	case boil.AfterUpdateHook:
		bookmarkAfterUpdateMu.Lock()
		bookmarkAfterUpdateHooks = append(bookmarkAfterUpdateHooks, bookmarkHook)
		bookmarkAfterUpdateMu.Unlock()
	case boil.BeforeDeleteHook:
		bookmarkBeforeDeleteMu.Lock()
		bookmarkBeforeDeleteHooks = append(bookmarkBeforeDeleteHooks, bookmarkHook)
		bookmarkBeforeDeleteMu.Unlock()
	case boil.AfterDeleteHook:
		bookmarkAfterDeleteMu.Lock()
		bookmarkAfterDeleteHooks = append(bookmarkAfterDeleteHooks, bookmarkHook)
		bookmarkAfterDeleteMu.Unlock()
	case boil.BeforeUpsertHook:
		bookmarkBeforeUpsertMu.Lock()
		bookmarkBeforeUpsertHooks = append(bookmarkBeforeUpsertHooks, bookmarkHook)
		bookmarkBeforeUpsertMu.Unlock()
	case boil.AfterUpsertHook:
		bookmarkAfterUpsertMu.Lock()
		bookmarkAfterUpsertHooks = append(bookmarkAfterUpsertHooks, bookmarkHook)
		bookmarkAfterUpsertMu.Unlock()
	}
}

// One returns a single bookmark record from the query.
func (q bookmarkQuery) One(ctx context.Context, exec boil.ContextExecutor) (*Bookmark, error) {
	o := &Bookmark{}

	queries.SetLimit(q.Query, 1)

	err := q.Bind(ctx, exec, o)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, sql.ErrNoRows
		}
		return nil, errors.Wrap(err, "entity: failed to execute a one query for bookmarks")
	}

	if err := o.doAfterSelectHooks(ctx, exec); err != nil {
		return o, err
	}

	return o, nil
}

// All returns all Bookmark records from the query.
func (q bookmarkQuery) All(ctx context.Context, exec boil.ContextExecutor) (BookmarkSlice, error) {
	var o []*Bookmark

	err := q.Bind(ctx, exec, &o)
	if err != nil {
		return nil, errors.Wrap(err, "entity: failed to assign all query results to Bookmark slice")
	}

	if len(bookmarkAfterSelectHooks) != 0 {
		for _, obj := range o {
			if err := obj.doAfterSelectHooks(ctx, exec); err != nil {
				return o, err
			}
		}
	}

	return o, nil
}

// Count returns the count of all Bookmark records in the query.
func (q bookmarkQuery) Count(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	var count int64

	queries.SetSelect(q.Query, nil)
	queries.SetCount(q.Query)

	err := q.Query.QueryRowContext(ctx, exec).Scan(&count)
	if err != nil {
		return 0, errors.Wrap(err, "entity: failed to count bookmarks rows")
	}

	return count, nil
}

// Exists checks if the row exists in the table.
func (q bookmarkQuery) Exists(ctx context.Context, exec boil.ContextExecutor) (bool, error) {
	var count int64

	queries.SetSelect(q.Query, nil)
	queries.SetCount(q.Query)
	queries.SetLimit(q.Query, 1)

	err := q.Query.QueryRowContext(ctx, exec).Scan(&count)
	if err != nil {
		return false, errors.Wrap(err, "entity: failed to check if bookmarks exists")
	}

	return count > 0, nil
}

// Bookmarks retrieves all the records using an executor.
func Bookmarks(mods ...qm.QueryMod) bookmarkQuery {
	mods = append(mods, qm.From("\"bookmarks\""))
	q := NewQuery(mods...)
	if len(queries.GetSelect(q)) == 0 {
		queries.SetSelect(q, []string{"\"bookmarks\".*"})
	}

	return bookmarkQuery{q}
}

// FindBookmark retrieves a single record by ID with an executor.
// If selectCols is empty Find will return all columns.
func FindBookmark(ctx context.Context, exec boil.ContextExecutor, iD string, selectCols ...string) (*Bookmark, error) {
	bookmarkObj := &Bookmark{}

	sel := "*"
	if len(selectCols) > 0 {
		sel = strings.Join(strmangle.IdentQuoteSlice(dialect.LQ, dialect.RQ, selectCols), ",")
	}
	query := fmt.Sprintf(
		"select %s from \"bookmarks\" where \"id\"=$1", sel,
	)

	q := queries.Raw(query, iD)

	err := q.Bind(ctx, exec, bookmarkObj)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, sql.ErrNoRows
		}
		return nil, errors.Wrap(err, "entity: unable to select from bookmarks")
	}

	if err = bookmarkObj.doAfterSelectHooks(ctx, exec); err != nil {
		return bookmarkObj, err
	}

	return bookmarkObj, nil
}

// Insert a single record using an executor.
// See boil.Columns.InsertColumnSet documentation to understand column list inference for inserts.
func (o *Bookmark) Insert(ctx context.Context, exec boil.ContextExecutor, columns boil.Columns) error {
	if o == nil {
		return errors.New("entity: no bookmarks provided for insertion")
	}

	var err error
	if !boil.TimestampsAreSkipped(ctx) {
		currTime := time.Now().In(boil.GetLocation())

		if o.CreatedAt.IsZero() {
			o.CreatedAt = currTime
		}
		if o.UpdatedAt.IsZero() {
			o.UpdatedAt = currTime
		}
	}

	if err := o.doBeforeInsertHooks(ctx, exec); err != nil {
		return err
	}

	nzDefaults := queries.NonZeroDefaultSet(bookmarkColumnsWithDefault, o)

	key := makeCacheKey(columns, nzDefaults)
	bookmarkInsertCacheMut.RLock()
	cache, cached := bookmarkInsertCache[key]
	bookmarkInsertCacheMut.RUnlock()

	if !cached {
		wl, returnColumns := columns.InsertColumnSet(
			bookmarkAllColumns,
			bookmarkColumnsWithDefault,
			bookmarkColumnsWithoutDefault,
			nzDefaults,
		)

		cache.valueMapping, err = queries.BindMapping(bookmarkType, bookmarkMapping, wl)
		if err != nil {
			return err
		}
		cache.retMapping, err = queries.BindMapping(bookmarkType, bookmarkMapping, returnColumns)
		if err != nil {
			return err
		}
		if len(wl) != 0 {
			cache.query = fmt.Sprintf("INSERT INTO \"bookmarks\" (\"%s\") %%sVALUES (%s)%%s", strings.Join(wl, "\",\""), strmangle.Placeholders(dialect.UseIndexPlaceholders, len(wl), 1, 1))
		} else {
			cache.query = "INSERT INTO \"bookmarks\" %sDEFAULT VALUES%s"
		}

		var queryOutput, queryReturning string

		if len(cache.retMapping) != 0 {
			queryReturning = fmt.Sprintf(" RETURNING \"%s\"", strings.Join(returnColumns, "\",\""))
		}

		cache.query = fmt.Sprintf(cache.query, queryOutput, queryReturning)
	}

	value := reflect.Indirect(reflect.ValueOf(o))
	vals := queries.ValuesFromMapping(value, cache.valueMapping)

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, cache.query)
		fmt.Fprintln(writer, vals)
	}

	if len(cache.retMapping) != 0 {
		err = exec.QueryRowContext(ctx, cache.query, vals...).Scan(queries.PtrsFromMapping(value, cache.retMapping)...)
	} else {
		_, err = exec.ExecContext(ctx, cache.query, vals...)
	}

	if err != nil {
		return errors.Wrap(err, "entity: unable to insert into bookmarks")
	}

	if !cached {
		bookmarkInsertCacheMut.Lock()
		bookmarkInsertCache[key] = cache
		bookmarkInsertCacheMut.Unlock()
	}

	return o.doAfterInsertHooks(ctx, exec)
}

// Update uses an executor to update the Bookmark.
// See boil.Columns.UpdateColumnSet documentation to understand column list inference for updates.
// Update does not automatically update the record in case of default values. Use .Reload() to refresh the records.
func (o *Bookmark) Update(ctx context.Context, exec boil.ContextExecutor, columns boil.Columns) (int64, error) {
	if !boil.TimestampsAreSkipped(ctx) {
		currTime := time.Now().In(boil.GetLocation())

		o.UpdatedAt = currTime
	}

	var err error
	if err = o.doBeforeUpdateHooks(ctx, exec); err != nil {
		return 0, err
	}
	key := makeCacheKey(columns, nil)
	bookmarkUpdateCacheMut.RLock()
	cache, cached := bookmarkUpdateCache[key]
	bookmarkUpdateCacheMut.RUnlock()

	if !cached {
		wl := columns.UpdateColumnSet(
			bookmarkAllColumns,
			bookmarkPrimaryKeyColumns,
		)

		if !columns.IsWhitelist() {
			wl = strmangle.SetComplement(wl, []string{"created_at"})
		}
		if len(wl) == 0 {
			return 0, errors.New("entity: unable to update bookmarks, could not build whitelist")
		}

		cache.query = fmt.Sprintf("UPDATE \"bookmarks\" SET %s WHERE %s",
			strmangle.SetParamNames("\"", "\"", 1, wl),
			strmangle.WhereClause("\"", "\"", len(wl)+1, bookmarkPrimaryKeyColumns),
		)
		cache.valueMapping, err = queries.BindMapping(bookmarkType, bookmarkMapping, append(wl, bookmarkPrimaryKeyColumns...))
		if err != nil {
			return 0, err
		}
	}

	values := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(o)), cache.valueMapping)

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, cache.query)
		fmt.Fprintln(writer, values)
	}
	var result sql.Result
	result, err = exec.ExecContext(ctx, cache.query, values...)
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to update bookmarks row")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "entity: failed to get rows affected by update for bookmarks")
	}

	if !cached {
		bookmarkUpdateCacheMut.Lock()
		bookmarkUpdateCache[key] = cache
		bookmarkUpdateCacheMut.Unlock()
	}

	return rowsAff, o.doAfterUpdateHooks(ctx, exec)
}

// UpdateAll updates all rows with the specified column values.
func (q bookmarkQuery) UpdateAll(ctx context.Context, exec boil.ContextExecutor, cols M) (int64, error) {
	queries.SetUpdate(q.Query, cols)

	result, err := q.Query.ExecContext(ctx, exec)
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to update all for bookmarks")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to retrieve rows affected for bookmarks")
	}

	return rowsAff, nil
}

// UpdateAll updates all rows with the specified column values, using an executor.
func (o BookmarkSlice) UpdateAll(ctx context.Context, exec boil.ContextExecutor, cols M) (int64, error) {
	ln := int64(len(o))
	if ln == 0 {
		return 0, nil
	}

	if len(cols) == 0 {
		return 0, errors.New("entity: update all requires at least one column argument")
	}

	colNames := make([]string, len(cols))
	args := make([]interface{}, len(cols))

	i := 0
	for name, value := range cols {
		colNames[i] = name
		args[i] = value
		i++
	}

	// Append all of the primary key values for each column
	for _, obj := range o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), bookmarkPrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := fmt.Sprintf("UPDATE \"bookmarks\" SET %s WHERE %s",
		strmangle.SetParamNames("\"", "\"", 1, colNames),
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), len(colNames)+1, bookmarkPrimaryKeyColumns, len(o)))

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args...)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to update all in bookmark slice")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to retrieve rows affected all in update all bookmark")
	}
	return rowsAff, nil
}

// Upsert attempts an insert using an executor, and does an update or ignore on conflict.
// See boil.Columns documentation for how to properly use updateColumns and insertColumns.
func (o *Bookmark) Upsert(ctx context.Context, exec boil.ContextExecutor, updateOnConflict bool, conflictColumns []string, updateColumns, insertColumns boil.Columns, opts ...UpsertOptionFunc) error {
	if o == nil {
		return errors.New("entity: no bookmarks provided for upsert")
	}
	if !boil.TimestampsAreSkipped(ctx) {
		currTime := time.Now().In(boil.GetLocation())

		if o.CreatedAt.IsZero() {
			o.CreatedAt = currTime
		}
		o.UpdatedAt = currTime
	}

	if err := o.doBeforeUpsertHooks(ctx, exec); err != nil {
		return err
	}

	nzDefaults := queries.NonZeroDefaultSet(bookmarkColumnsWithDefault, o)

	// Build cache key in-line uglily - mysql vs psql problems
	buf := strmangle.GetBuffer()
	if updateOnConflict {
		buf.WriteByte('t')
	} else {
		buf.WriteByte('f')
	}
	buf.WriteByte('.')
	for _, c := range conflictColumns {
		buf.WriteString(c)
	}
	buf.WriteByte('.')
	buf.WriteString(strconv.Itoa(updateColumns.Kind))
	for _, c := range updateColumns.Cols {
		buf.WriteString(c)
	}
	buf.WriteByte('.')
	buf.WriteString(strconv.Itoa(insertColumns.Kind))
	for _, c := range insertColumns.Cols {
		buf.WriteString(c)
	}
	buf.WriteByte('.')
	for _, c := range nzDefaults {
		buf.WriteString(c)
	}
	key := buf.String()
	strmangle.PutBuffer(buf)

	bookmarkUpsertCacheMut.RLock()
	cache, cached := bookmarkUpsertCache[key]
	bookmarkUpsertCacheMut.RUnlock()

	var err error

	if !cached {
		insert, _ := insertColumns.InsertColumnSet(
			bookmarkAllColumns,
			bookmarkColumnsWithDefault,
			bookmarkColumnsWithoutDefault,
			nzDefaults,
		)

		update := updateColumns.UpdateColumnSet(
			bookmarkAllColumns,
			bookmarkPrimaryKeyColumns,
		)

		if updateOnConflict && len(update) == 0 {
			return errors.New("entity: unable to upsert bookmarks, could not build update column list")
		}

		ret := strmangle.SetComplement(bookmarkAllColumns, strmangle.SetIntersect(insert, update))

		conflict := conflictColumns
		if len(conflict) == 0 && updateOnConflict && len(update) != 0 {
			if len(bookmarkPrimaryKeyColumns) == 0 {
				return errors.New("entity: unable to upsert bookmarks, could not build conflict column list")
			}

			conflict = make([]string, len(bookmarkPrimaryKeyColumns))
			copy(conflict, bookmarkPrimaryKeyColumns)
		}
		cache.query = buildUpsertQueryPostgres(dialect, "\"bookmarks\"", updateOnConflict, ret, update, conflict, insert, opts...)

		cache.valueMapping, err = queries.BindMapping(bookmarkType, bookmarkMapping, insert)
		if err != nil {
			return err
		}
		if len(ret) != 0 {
			cache.retMapping, err = queries.BindMapping(bookmarkType, bookmarkMapping, ret)
			if err != nil {
				return err
			}
		}
	}

	value := reflect.Indirect(reflect.ValueOf(o))
	vals := queries.ValuesFromMapping(value, cache.valueMapping)
	var returns []interface{}
	if len(cache.retMapping) != 0 {
		returns = queries.PtrsFromMapping(value, cache.retMapping)
	}

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, cache.query)
		fmt.Fprintln(writer, vals)
	}
	if len(cache.retMapping) != 0 {
		err = exec.QueryRowContext(ctx, cache.query, vals...).Scan(returns...)
		if errors.Is(err, sql.ErrNoRows) {
			err = nil // Postgres doesn't return anything when there's no update
		}
	} else {
		_, err = exec.ExecContext(ctx, cache.query, vals...)
	}
	if err != nil {
		return errors.Wrap(err, "entity: unable to upsert bookmarks")
	}

	if !cached {
		bookmarkUpsertCacheMut.Lock()
		bookmarkUpsertCache[key] = cache
		bookmarkUpsertCacheMut.Unlock()
	}

	return o.doAfterUpsertHooks(ctx, exec)
}

// Delete deletes a single Bookmark record with an executor.
// Delete will match against the primary key column to find the record to delete.
func (o *Bookmark) Delete(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if o == nil {
		return 0, errors.New("entity: no Bookmark provided for delete")
	}

	if err := o.doBeforeDeleteHooks(ctx, exec); err != nil {
		return 0, err
	}

	args := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(o)), bookmarkPrimaryKeyMapping)
	sql := "DELETE FROM \"bookmarks\" WHERE \"id\"=$1"

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args...)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to delete from bookmarks")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "entity: failed to get rows affected by delete for bookmarks")
	}

	if err := o.doAfterDeleteHooks(ctx, exec); err != nil {
		return 0, err
	}

	return rowsAff, nil
}

// DeleteAll deletes all matching rows.
func (q bookmarkQuery) DeleteAll(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if q.Query == nil {
		return 0, errors.New("entity: no bookmarkQuery provided for delete all")
	}

	queries.SetDelete(q.Query)

	result, err := q.Query.ExecContext(ctx, exec)
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to delete all from bookmarks")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "entity: failed to get rows affected by deleteall for bookmarks")
	}

	return rowsAff, nil
}

// DeleteAll deletes all rows in the slice, using an executor.
func (o BookmarkSlice) DeleteAll(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if len(o) == 0 {
		return 0, nil
	}

	if len(bookmarkBeforeDeleteHooks) != 0 {
		for _, obj := range o {
			if err := obj.doBeforeDeleteHooks(ctx, exec); err != nil {
				return 0, err
			}
		}
	}

	var args []interface{}
	for _, obj := range o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), bookmarkPrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := "DELETE FROM \"bookmarks\" WHERE " +
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), 1, bookmarkPrimaryKeyColumns, len(o))

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to delete all from bookmark slice")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "entity: failed to get rows affected by deleteall for bookmarks")
	}

	if len(bookmarkAfterDeleteHooks) != 0 {
		for _, obj := range o {
			if err := obj.doAfterDeleteHooks(ctx, exec); err != nil {
				return 0, err
			}
		}
	}

	return rowsAff, nil
}

// Reload refetches the object from the database
// using the primary keys with an executor.
func (o *Bookmark) Reload(ctx context.Context, exec boil.ContextExecutor) error {
	ret, err := FindBookmark(ctx, exec, o.ID)
	if err != nil {
		return err
	}

	*o = *ret
	return nil
}

// ReloadAll refetches every row with matching primary key column values
// and overwrites the original object slice with the newly updated slice.
func (o *BookmarkSlice) ReloadAll(ctx context.Context, exec boil.ContextExecutor) error {
	if o == nil || len(*o) == 0 {
		return nil
	}

	slice := BookmarkSlice{}
	var args []interface{}
	for _, obj := range *o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), bookmarkPrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := "SELECT \"bookmarks\".* FROM \"bookmarks\" WHERE " +
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), 1, bookmarkPrimaryKeyColumns, len(*o))

	q := queries.Raw(sql, args...)

	err := q.Bind(ctx, exec, &slice)
	if err != nil {
		return errors.Wrap(err, "entity: unable to reload all in BookmarkSlice")
	}

	*o = slice

	return nil
}

// BookmarkExists checks if the Bookmark row exists.
func BookmarkExists(ctx context.Context, exec boil.ContextExecutor, iD string) (bool, error) {
	var exists bool
	sql := "select exists(select 1 from \"bookmarks\" where \"id\"=$1 limit 1)"

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, iD)
	}
	row := exec.QueryRowContext(ctx, sql, iD)

	err := row.Scan(&exists)
	if err != nil {
		return false, errors.Wrap(err, "entity: unable to check if bookmarks exists")
	}

	return exists, nil
}

// Exists checks if the Bookmark row exists.
func (o *Bookmark) Exists(ctx context.Context, exec boil.ContextExecutor) (bool, error) {
	return BookmarkExists(ctx, exec, o.ID)
}
