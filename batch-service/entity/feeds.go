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

// Feed is an object representing the database table.
type Feed struct {
	ID         string    `boil:"id" json:"id" toml:"id" yaml:"id"`
	Name       string    `boil:"name" json:"name" toml:"name" yaml:"name"`
	PlatformID string    `boil:"platform_id" json:"platform_id" toml:"platform_id" yaml:"platform_id"`
	CategoryID string    `boil:"category_id" json:"category_id" toml:"category_id" yaml:"category_id"`
	RSSURL     string    `boil:"rss_url" json:"rss_url" toml:"rss_url" yaml:"rss_url"`
	CreatedAt  time.Time `boil:"created_at" json:"created_at" toml:"created_at" yaml:"created_at"`
	UpdatedAt  time.Time `boil:"updated_at" json:"updated_at" toml:"updated_at" yaml:"updated_at"`
	DeletedAt  null.Time `boil:"deleted_at" json:"deleted_at,omitempty" toml:"deleted_at" yaml:"deleted_at,omitempty"`

	R *feedR `boil:"-" json:"-" toml:"-" yaml:"-"`
	L feedL  `boil:"-" json:"-" toml:"-" yaml:"-"`
}

var FeedColumns = struct {
	ID         string
	Name       string
	PlatformID string
	CategoryID string
	RSSURL     string
	CreatedAt  string
	UpdatedAt  string
	DeletedAt  string
}{
	ID:         "id",
	Name:       "name",
	PlatformID: "platform_id",
	CategoryID: "category_id",
	RSSURL:     "rss_url",
	CreatedAt:  "created_at",
	UpdatedAt:  "updated_at",
	DeletedAt:  "deleted_at",
}

var FeedTableColumns = struct {
	ID         string
	Name       string
	PlatformID string
	CategoryID string
	RSSURL     string
	CreatedAt  string
	UpdatedAt  string
	DeletedAt  string
}{
	ID:         "feeds.id",
	Name:       "feeds.name",
	PlatformID: "feeds.platform_id",
	CategoryID: "feeds.category_id",
	RSSURL:     "feeds.rss_url",
	CreatedAt:  "feeds.created_at",
	UpdatedAt:  "feeds.updated_at",
	DeletedAt:  "feeds.deleted_at",
}

// Generated where

var FeedWhere = struct {
	ID         whereHelperstring
	Name       whereHelperstring
	PlatformID whereHelperstring
	CategoryID whereHelperstring
	RSSURL     whereHelperstring
	CreatedAt  whereHelpertime_Time
	UpdatedAt  whereHelpertime_Time
	DeletedAt  whereHelpernull_Time
}{
	ID:         whereHelperstring{field: "\"feeds\".\"id\""},
	Name:       whereHelperstring{field: "\"feeds\".\"name\""},
	PlatformID: whereHelperstring{field: "\"feeds\".\"platform_id\""},
	CategoryID: whereHelperstring{field: "\"feeds\".\"category_id\""},
	RSSURL:     whereHelperstring{field: "\"feeds\".\"rss_url\""},
	CreatedAt:  whereHelpertime_Time{field: "\"feeds\".\"created_at\""},
	UpdatedAt:  whereHelpertime_Time{field: "\"feeds\".\"updated_at\""},
	DeletedAt:  whereHelpernull_Time{field: "\"feeds\".\"deleted_at\""},
}

// FeedRels is where relationship names are stored.
var FeedRels = struct {
	Category string
	Platform string
}{
	Category: "Category",
	Platform: "Platform",
}

// feedR is where relationships are stored.
type feedR struct {
	Category *Category `boil:"Category" json:"Category" toml:"Category" yaml:"Category"`
	Platform *Platform `boil:"Platform" json:"Platform" toml:"Platform" yaml:"Platform"`
}

// NewStruct creates a new relationship struct
func (*feedR) NewStruct() *feedR {
	return &feedR{}
}

func (r *feedR) GetCategory() *Category {
	if r == nil {
		return nil
	}
	return r.Category
}

func (r *feedR) GetPlatform() *Platform {
	if r == nil {
		return nil
	}
	return r.Platform
}

// feedL is where Load methods for each relationship are stored.
type feedL struct{}

var (
	feedAllColumns            = []string{"id", "name", "platform_id", "category_id", "rss_url", "created_at", "updated_at", "deleted_at"}
	feedColumnsWithoutDefault = []string{"name", "platform_id", "category_id", "rss_url"}
	feedColumnsWithDefault    = []string{"id", "created_at", "updated_at", "deleted_at"}
	feedPrimaryKeyColumns     = []string{"id"}
	feedGeneratedColumns      = []string{}
)

type (
	// FeedSlice is an alias for a slice of pointers to Feed.
	// This should almost always be used instead of []Feed.
	FeedSlice []*Feed
	// FeedHook is the signature for custom Feed hook methods
	FeedHook func(context.Context, boil.ContextExecutor, *Feed) error

	feedQuery struct {
		*queries.Query
	}
)

// Cache for insert, update and upsert
var (
	feedType                 = reflect.TypeOf(&Feed{})
	feedMapping              = queries.MakeStructMapping(feedType)
	feedPrimaryKeyMapping, _ = queries.BindMapping(feedType, feedMapping, feedPrimaryKeyColumns)
	feedInsertCacheMut       sync.RWMutex
	feedInsertCache          = make(map[string]insertCache)
	feedUpdateCacheMut       sync.RWMutex
	feedUpdateCache          = make(map[string]updateCache)
	feedUpsertCacheMut       sync.RWMutex
	feedUpsertCache          = make(map[string]insertCache)
)

var (
	// Force time package dependency for automated UpdatedAt/CreatedAt.
	_ = time.Second
	// Force qmhelper dependency for where clause generation (which doesn't
	// always happen)
	_ = qmhelper.Where
)

var feedAfterSelectMu sync.Mutex
var feedAfterSelectHooks []FeedHook

var feedBeforeInsertMu sync.Mutex
var feedBeforeInsertHooks []FeedHook
var feedAfterInsertMu sync.Mutex
var feedAfterInsertHooks []FeedHook

var feedBeforeUpdateMu sync.Mutex
var feedBeforeUpdateHooks []FeedHook
var feedAfterUpdateMu sync.Mutex
var feedAfterUpdateHooks []FeedHook

var feedBeforeDeleteMu sync.Mutex
var feedBeforeDeleteHooks []FeedHook
var feedAfterDeleteMu sync.Mutex
var feedAfterDeleteHooks []FeedHook

var feedBeforeUpsertMu sync.Mutex
var feedBeforeUpsertHooks []FeedHook
var feedAfterUpsertMu sync.Mutex
var feedAfterUpsertHooks []FeedHook

// doAfterSelectHooks executes all "after Select" hooks.
func (o *Feed) doAfterSelectHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range feedAfterSelectHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeInsertHooks executes all "before insert" hooks.
func (o *Feed) doBeforeInsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range feedBeforeInsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterInsertHooks executes all "after Insert" hooks.
func (o *Feed) doAfterInsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range feedAfterInsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeUpdateHooks executes all "before Update" hooks.
func (o *Feed) doBeforeUpdateHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range feedBeforeUpdateHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterUpdateHooks executes all "after Update" hooks.
func (o *Feed) doAfterUpdateHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range feedAfterUpdateHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeDeleteHooks executes all "before Delete" hooks.
func (o *Feed) doBeforeDeleteHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range feedBeforeDeleteHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterDeleteHooks executes all "after Delete" hooks.
func (o *Feed) doAfterDeleteHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range feedAfterDeleteHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeUpsertHooks executes all "before Upsert" hooks.
func (o *Feed) doBeforeUpsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range feedBeforeUpsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterUpsertHooks executes all "after Upsert" hooks.
func (o *Feed) doAfterUpsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range feedAfterUpsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// AddFeedHook registers your hook function for all future operations.
func AddFeedHook(hookPoint boil.HookPoint, feedHook FeedHook) {
	switch hookPoint {
	case boil.AfterSelectHook:
		feedAfterSelectMu.Lock()
		feedAfterSelectHooks = append(feedAfterSelectHooks, feedHook)
		feedAfterSelectMu.Unlock()
	case boil.BeforeInsertHook:
		feedBeforeInsertMu.Lock()
		feedBeforeInsertHooks = append(feedBeforeInsertHooks, feedHook)
		feedBeforeInsertMu.Unlock()
	case boil.AfterInsertHook:
		feedAfterInsertMu.Lock()
		feedAfterInsertHooks = append(feedAfterInsertHooks, feedHook)
		feedAfterInsertMu.Unlock()
	case boil.BeforeUpdateHook:
		feedBeforeUpdateMu.Lock()
		feedBeforeUpdateHooks = append(feedBeforeUpdateHooks, feedHook)
		feedBeforeUpdateMu.Unlock()
	case boil.AfterUpdateHook:
		feedAfterUpdateMu.Lock()
		feedAfterUpdateHooks = append(feedAfterUpdateHooks, feedHook)
		feedAfterUpdateMu.Unlock()
	case boil.BeforeDeleteHook:
		feedBeforeDeleteMu.Lock()
		feedBeforeDeleteHooks = append(feedBeforeDeleteHooks, feedHook)
		feedBeforeDeleteMu.Unlock()
	case boil.AfterDeleteHook:
		feedAfterDeleteMu.Lock()
		feedAfterDeleteHooks = append(feedAfterDeleteHooks, feedHook)
		feedAfterDeleteMu.Unlock()
	case boil.BeforeUpsertHook:
		feedBeforeUpsertMu.Lock()
		feedBeforeUpsertHooks = append(feedBeforeUpsertHooks, feedHook)
		feedBeforeUpsertMu.Unlock()
	case boil.AfterUpsertHook:
		feedAfterUpsertMu.Lock()
		feedAfterUpsertHooks = append(feedAfterUpsertHooks, feedHook)
		feedAfterUpsertMu.Unlock()
	}
}

// One returns a single feed record from the query.
func (q feedQuery) One(ctx context.Context, exec boil.ContextExecutor) (*Feed, error) {
	o := &Feed{}

	queries.SetLimit(q.Query, 1)

	err := q.Bind(ctx, exec, o)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, sql.ErrNoRows
		}
		return nil, errors.Wrap(err, "entity: failed to execute a one query for feeds")
	}

	if err := o.doAfterSelectHooks(ctx, exec); err != nil {
		return o, err
	}

	return o, nil
}

// All returns all Feed records from the query.
func (q feedQuery) All(ctx context.Context, exec boil.ContextExecutor) (FeedSlice, error) {
	var o []*Feed

	err := q.Bind(ctx, exec, &o)
	if err != nil {
		return nil, errors.Wrap(err, "entity: failed to assign all query results to Feed slice")
	}

	if len(feedAfterSelectHooks) != 0 {
		for _, obj := range o {
			if err := obj.doAfterSelectHooks(ctx, exec); err != nil {
				return o, err
			}
		}
	}

	return o, nil
}

// Count returns the count of all Feed records in the query.
func (q feedQuery) Count(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	var count int64

	queries.SetSelect(q.Query, nil)
	queries.SetCount(q.Query)

	err := q.Query.QueryRowContext(ctx, exec).Scan(&count)
	if err != nil {
		return 0, errors.Wrap(err, "entity: failed to count feeds rows")
	}

	return count, nil
}

// Exists checks if the row exists in the table.
func (q feedQuery) Exists(ctx context.Context, exec boil.ContextExecutor) (bool, error) {
	var count int64

	queries.SetSelect(q.Query, nil)
	queries.SetCount(q.Query)
	queries.SetLimit(q.Query, 1)

	err := q.Query.QueryRowContext(ctx, exec).Scan(&count)
	if err != nil {
		return false, errors.Wrap(err, "entity: failed to check if feeds exists")
	}

	return count > 0, nil
}

// Category pointed to by the foreign key.
func (o *Feed) Category(mods ...qm.QueryMod) categoryQuery {
	queryMods := []qm.QueryMod{
		qm.Where("\"id\" = ?", o.CategoryID),
	}

	queryMods = append(queryMods, mods...)

	return Categories(queryMods...)
}

// Platform pointed to by the foreign key.
func (o *Feed) Platform(mods ...qm.QueryMod) platformQuery {
	queryMods := []qm.QueryMod{
		qm.Where("\"id\" = ?", o.PlatformID),
	}

	queryMods = append(queryMods, mods...)

	return Platforms(queryMods...)
}

// LoadCategory allows an eager lookup of values, cached into the
// loaded structs of the objects. This is for an N-1 relationship.
func (feedL) LoadCategory(ctx context.Context, e boil.ContextExecutor, singular bool, maybeFeed interface{}, mods queries.Applicator) error {
	var slice []*Feed
	var object *Feed

	if singular {
		var ok bool
		object, ok = maybeFeed.(*Feed)
		if !ok {
			object = new(Feed)
			ok = queries.SetFromEmbeddedStruct(&object, &maybeFeed)
			if !ok {
				return errors.New(fmt.Sprintf("failed to set %T from embedded struct %T", object, maybeFeed))
			}
		}
	} else {
		s, ok := maybeFeed.(*[]*Feed)
		if ok {
			slice = *s
		} else {
			ok = queries.SetFromEmbeddedStruct(&slice, maybeFeed)
			if !ok {
				return errors.New(fmt.Sprintf("failed to set %T from embedded struct %T", slice, maybeFeed))
			}
		}
	}

	args := make(map[interface{}]struct{})
	if singular {
		if object.R == nil {
			object.R = &feedR{}
		}
		args[object.CategoryID] = struct{}{}

	} else {
		for _, obj := range slice {
			if obj.R == nil {
				obj.R = &feedR{}
			}

			args[obj.CategoryID] = struct{}{}

		}
	}

	if len(args) == 0 {
		return nil
	}

	argsSlice := make([]interface{}, len(args))
	i := 0
	for arg := range args {
		argsSlice[i] = arg
		i++
	}

	query := NewQuery(
		qm.From(`categories`),
		qm.WhereIn(`categories.id in ?`, argsSlice...),
	)
	if mods != nil {
		mods.Apply(query)
	}

	results, err := query.QueryContext(ctx, e)
	if err != nil {
		return errors.Wrap(err, "failed to eager load Category")
	}

	var resultSlice []*Category
	if err = queries.Bind(results, &resultSlice); err != nil {
		return errors.Wrap(err, "failed to bind eager loaded slice Category")
	}

	if err = results.Close(); err != nil {
		return errors.Wrap(err, "failed to close results of eager load for categories")
	}
	if err = results.Err(); err != nil {
		return errors.Wrap(err, "error occurred during iteration of eager loaded relations for categories")
	}

	if len(categoryAfterSelectHooks) != 0 {
		for _, obj := range resultSlice {
			if err := obj.doAfterSelectHooks(ctx, e); err != nil {
				return err
			}
		}
	}

	if len(resultSlice) == 0 {
		return nil
	}

	if singular {
		foreign := resultSlice[0]
		object.R.Category = foreign
		if foreign.R == nil {
			foreign.R = &categoryR{}
		}
		foreign.R.Feeds = append(foreign.R.Feeds, object)
		return nil
	}

	for _, local := range slice {
		for _, foreign := range resultSlice {
			if local.CategoryID == foreign.ID {
				local.R.Category = foreign
				if foreign.R == nil {
					foreign.R = &categoryR{}
				}
				foreign.R.Feeds = append(foreign.R.Feeds, local)
				break
			}
		}
	}

	return nil
}

// LoadPlatform allows an eager lookup of values, cached into the
// loaded structs of the objects. This is for an N-1 relationship.
func (feedL) LoadPlatform(ctx context.Context, e boil.ContextExecutor, singular bool, maybeFeed interface{}, mods queries.Applicator) error {
	var slice []*Feed
	var object *Feed

	if singular {
		var ok bool
		object, ok = maybeFeed.(*Feed)
		if !ok {
			object = new(Feed)
			ok = queries.SetFromEmbeddedStruct(&object, &maybeFeed)
			if !ok {
				return errors.New(fmt.Sprintf("failed to set %T from embedded struct %T", object, maybeFeed))
			}
		}
	} else {
		s, ok := maybeFeed.(*[]*Feed)
		if ok {
			slice = *s
		} else {
			ok = queries.SetFromEmbeddedStruct(&slice, maybeFeed)
			if !ok {
				return errors.New(fmt.Sprintf("failed to set %T from embedded struct %T", slice, maybeFeed))
			}
		}
	}

	args := make(map[interface{}]struct{})
	if singular {
		if object.R == nil {
			object.R = &feedR{}
		}
		args[object.PlatformID] = struct{}{}

	} else {
		for _, obj := range slice {
			if obj.R == nil {
				obj.R = &feedR{}
			}

			args[obj.PlatformID] = struct{}{}

		}
	}

	if len(args) == 0 {
		return nil
	}

	argsSlice := make([]interface{}, len(args))
	i := 0
	for arg := range args {
		argsSlice[i] = arg
		i++
	}

	query := NewQuery(
		qm.From(`platforms`),
		qm.WhereIn(`platforms.id in ?`, argsSlice...),
	)
	if mods != nil {
		mods.Apply(query)
	}

	results, err := query.QueryContext(ctx, e)
	if err != nil {
		return errors.Wrap(err, "failed to eager load Platform")
	}

	var resultSlice []*Platform
	if err = queries.Bind(results, &resultSlice); err != nil {
		return errors.Wrap(err, "failed to bind eager loaded slice Platform")
	}

	if err = results.Close(); err != nil {
		return errors.Wrap(err, "failed to close results of eager load for platforms")
	}
	if err = results.Err(); err != nil {
		return errors.Wrap(err, "error occurred during iteration of eager loaded relations for platforms")
	}

	if len(platformAfterSelectHooks) != 0 {
		for _, obj := range resultSlice {
			if err := obj.doAfterSelectHooks(ctx, e); err != nil {
				return err
			}
		}
	}

	if len(resultSlice) == 0 {
		return nil
	}

	if singular {
		foreign := resultSlice[0]
		object.R.Platform = foreign
		if foreign.R == nil {
			foreign.R = &platformR{}
		}
		foreign.R.Feeds = append(foreign.R.Feeds, object)
		return nil
	}

	for _, local := range slice {
		for _, foreign := range resultSlice {
			if local.PlatformID == foreign.ID {
				local.R.Platform = foreign
				if foreign.R == nil {
					foreign.R = &platformR{}
				}
				foreign.R.Feeds = append(foreign.R.Feeds, local)
				break
			}
		}
	}

	return nil
}

// SetCategory of the feed to the related item.
// Sets o.R.Category to related.
// Adds o to related.R.Feeds.
func (o *Feed) SetCategory(ctx context.Context, exec boil.ContextExecutor, insert bool, related *Category) error {
	var err error
	if insert {
		if err = related.Insert(ctx, exec, boil.Infer()); err != nil {
			return errors.Wrap(err, "failed to insert into foreign table")
		}
	}

	updateQuery := fmt.Sprintf(
		"UPDATE \"feeds\" SET %s WHERE %s",
		strmangle.SetParamNames("\"", "\"", 1, []string{"category_id"}),
		strmangle.WhereClause("\"", "\"", 2, feedPrimaryKeyColumns),
	)
	values := []interface{}{related.ID, o.ID}

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, updateQuery)
		fmt.Fprintln(writer, values)
	}
	if _, err = exec.ExecContext(ctx, updateQuery, values...); err != nil {
		return errors.Wrap(err, "failed to update local table")
	}

	o.CategoryID = related.ID
	if o.R == nil {
		o.R = &feedR{
			Category: related,
		}
	} else {
		o.R.Category = related
	}

	if related.R == nil {
		related.R = &categoryR{
			Feeds: FeedSlice{o},
		}
	} else {
		related.R.Feeds = append(related.R.Feeds, o)
	}

	return nil
}

// SetPlatform of the feed to the related item.
// Sets o.R.Platform to related.
// Adds o to related.R.Feeds.
func (o *Feed) SetPlatform(ctx context.Context, exec boil.ContextExecutor, insert bool, related *Platform) error {
	var err error
	if insert {
		if err = related.Insert(ctx, exec, boil.Infer()); err != nil {
			return errors.Wrap(err, "failed to insert into foreign table")
		}
	}

	updateQuery := fmt.Sprintf(
		"UPDATE \"feeds\" SET %s WHERE %s",
		strmangle.SetParamNames("\"", "\"", 1, []string{"platform_id"}),
		strmangle.WhereClause("\"", "\"", 2, feedPrimaryKeyColumns),
	)
	values := []interface{}{related.ID, o.ID}

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, updateQuery)
		fmt.Fprintln(writer, values)
	}
	if _, err = exec.ExecContext(ctx, updateQuery, values...); err != nil {
		return errors.Wrap(err, "failed to update local table")
	}

	o.PlatformID = related.ID
	if o.R == nil {
		o.R = &feedR{
			Platform: related,
		}
	} else {
		o.R.Platform = related
	}

	if related.R == nil {
		related.R = &platformR{
			Feeds: FeedSlice{o},
		}
	} else {
		related.R.Feeds = append(related.R.Feeds, o)
	}

	return nil
}

// Feeds retrieves all the records using an executor.
func Feeds(mods ...qm.QueryMod) feedQuery {
	mods = append(mods, qm.From("\"feeds\""))
	q := NewQuery(mods...)
	if len(queries.GetSelect(q)) == 0 {
		queries.SetSelect(q, []string{"\"feeds\".*"})
	}

	return feedQuery{q}
}

// FindFeed retrieves a single record by ID with an executor.
// If selectCols is empty Find will return all columns.
func FindFeed(ctx context.Context, exec boil.ContextExecutor, iD string, selectCols ...string) (*Feed, error) {
	feedObj := &Feed{}

	sel := "*"
	if len(selectCols) > 0 {
		sel = strings.Join(strmangle.IdentQuoteSlice(dialect.LQ, dialect.RQ, selectCols), ",")
	}
	query := fmt.Sprintf(
		"select %s from \"feeds\" where \"id\"=$1", sel,
	)

	q := queries.Raw(query, iD)

	err := q.Bind(ctx, exec, feedObj)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, sql.ErrNoRows
		}
		return nil, errors.Wrap(err, "entity: unable to select from feeds")
	}

	if err = feedObj.doAfterSelectHooks(ctx, exec); err != nil {
		return feedObj, err
	}

	return feedObj, nil
}

// Insert a single record using an executor.
// See boil.Columns.InsertColumnSet documentation to understand column list inference for inserts.
func (o *Feed) Insert(ctx context.Context, exec boil.ContextExecutor, columns boil.Columns) error {
	if o == nil {
		return errors.New("entity: no feeds provided for insertion")
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

	nzDefaults := queries.NonZeroDefaultSet(feedColumnsWithDefault, o)

	key := makeCacheKey(columns, nzDefaults)
	feedInsertCacheMut.RLock()
	cache, cached := feedInsertCache[key]
	feedInsertCacheMut.RUnlock()

	if !cached {
		wl, returnColumns := columns.InsertColumnSet(
			feedAllColumns,
			feedColumnsWithDefault,
			feedColumnsWithoutDefault,
			nzDefaults,
		)

		cache.valueMapping, err = queries.BindMapping(feedType, feedMapping, wl)
		if err != nil {
			return err
		}
		cache.retMapping, err = queries.BindMapping(feedType, feedMapping, returnColumns)
		if err != nil {
			return err
		}
		if len(wl) != 0 {
			cache.query = fmt.Sprintf("INSERT INTO \"feeds\" (\"%s\") %%sVALUES (%s)%%s", strings.Join(wl, "\",\""), strmangle.Placeholders(dialect.UseIndexPlaceholders, len(wl), 1, 1))
		} else {
			cache.query = "INSERT INTO \"feeds\" %sDEFAULT VALUES%s"
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
		return errors.Wrap(err, "entity: unable to insert into feeds")
	}

	if !cached {
		feedInsertCacheMut.Lock()
		feedInsertCache[key] = cache
		feedInsertCacheMut.Unlock()
	}

	return o.doAfterInsertHooks(ctx, exec)
}

// Update uses an executor to update the Feed.
// See boil.Columns.UpdateColumnSet documentation to understand column list inference for updates.
// Update does not automatically update the record in case of default values. Use .Reload() to refresh the records.
func (o *Feed) Update(ctx context.Context, exec boil.ContextExecutor, columns boil.Columns) (int64, error) {
	if !boil.TimestampsAreSkipped(ctx) {
		currTime := time.Now().In(boil.GetLocation())

		o.UpdatedAt = currTime
	}

	var err error
	if err = o.doBeforeUpdateHooks(ctx, exec); err != nil {
		return 0, err
	}
	key := makeCacheKey(columns, nil)
	feedUpdateCacheMut.RLock()
	cache, cached := feedUpdateCache[key]
	feedUpdateCacheMut.RUnlock()

	if !cached {
		wl := columns.UpdateColumnSet(
			feedAllColumns,
			feedPrimaryKeyColumns,
		)

		if !columns.IsWhitelist() {
			wl = strmangle.SetComplement(wl, []string{"created_at"})
		}
		if len(wl) == 0 {
			return 0, errors.New("entity: unable to update feeds, could not build whitelist")
		}

		cache.query = fmt.Sprintf("UPDATE \"feeds\" SET %s WHERE %s",
			strmangle.SetParamNames("\"", "\"", 1, wl),
			strmangle.WhereClause("\"", "\"", len(wl)+1, feedPrimaryKeyColumns),
		)
		cache.valueMapping, err = queries.BindMapping(feedType, feedMapping, append(wl, feedPrimaryKeyColumns...))
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
		return 0, errors.Wrap(err, "entity: unable to update feeds row")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "entity: failed to get rows affected by update for feeds")
	}

	if !cached {
		feedUpdateCacheMut.Lock()
		feedUpdateCache[key] = cache
		feedUpdateCacheMut.Unlock()
	}

	return rowsAff, o.doAfterUpdateHooks(ctx, exec)
}

// UpdateAll updates all rows with the specified column values.
func (q feedQuery) UpdateAll(ctx context.Context, exec boil.ContextExecutor, cols M) (int64, error) {
	queries.SetUpdate(q.Query, cols)

	result, err := q.Query.ExecContext(ctx, exec)
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to update all for feeds")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to retrieve rows affected for feeds")
	}

	return rowsAff, nil
}

// UpdateAll updates all rows with the specified column values, using an executor.
func (o FeedSlice) UpdateAll(ctx context.Context, exec boil.ContextExecutor, cols M) (int64, error) {
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
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), feedPrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := fmt.Sprintf("UPDATE \"feeds\" SET %s WHERE %s",
		strmangle.SetParamNames("\"", "\"", 1, colNames),
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), len(colNames)+1, feedPrimaryKeyColumns, len(o)))

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args...)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to update all in feed slice")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to retrieve rows affected all in update all feed")
	}
	return rowsAff, nil
}

// Upsert attempts an insert using an executor, and does an update or ignore on conflict.
// See boil.Columns documentation for how to properly use updateColumns and insertColumns.
func (o *Feed) Upsert(ctx context.Context, exec boil.ContextExecutor, updateOnConflict bool, conflictColumns []string, updateColumns, insertColumns boil.Columns, opts ...UpsertOptionFunc) error {
	if o == nil {
		return errors.New("entity: no feeds provided for upsert")
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

	nzDefaults := queries.NonZeroDefaultSet(feedColumnsWithDefault, o)

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

	feedUpsertCacheMut.RLock()
	cache, cached := feedUpsertCache[key]
	feedUpsertCacheMut.RUnlock()

	var err error

	if !cached {
		insert, _ := insertColumns.InsertColumnSet(
			feedAllColumns,
			feedColumnsWithDefault,
			feedColumnsWithoutDefault,
			nzDefaults,
		)

		update := updateColumns.UpdateColumnSet(
			feedAllColumns,
			feedPrimaryKeyColumns,
		)

		if updateOnConflict && len(update) == 0 {
			return errors.New("entity: unable to upsert feeds, could not build update column list")
		}

		ret := strmangle.SetComplement(feedAllColumns, strmangle.SetIntersect(insert, update))

		conflict := conflictColumns
		if len(conflict) == 0 && updateOnConflict && len(update) != 0 {
			if len(feedPrimaryKeyColumns) == 0 {
				return errors.New("entity: unable to upsert feeds, could not build conflict column list")
			}

			conflict = make([]string, len(feedPrimaryKeyColumns))
			copy(conflict, feedPrimaryKeyColumns)
		}
		cache.query = buildUpsertQueryPostgres(dialect, "\"feeds\"", updateOnConflict, ret, update, conflict, insert, opts...)

		cache.valueMapping, err = queries.BindMapping(feedType, feedMapping, insert)
		if err != nil {
			return err
		}
		if len(ret) != 0 {
			cache.retMapping, err = queries.BindMapping(feedType, feedMapping, ret)
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
		return errors.Wrap(err, "entity: unable to upsert feeds")
	}

	if !cached {
		feedUpsertCacheMut.Lock()
		feedUpsertCache[key] = cache
		feedUpsertCacheMut.Unlock()
	}

	return o.doAfterUpsertHooks(ctx, exec)
}

// Delete deletes a single Feed record with an executor.
// Delete will match against the primary key column to find the record to delete.
func (o *Feed) Delete(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if o == nil {
		return 0, errors.New("entity: no Feed provided for delete")
	}

	if err := o.doBeforeDeleteHooks(ctx, exec); err != nil {
		return 0, err
	}

	args := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(o)), feedPrimaryKeyMapping)
	sql := "DELETE FROM \"feeds\" WHERE \"id\"=$1"

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args...)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to delete from feeds")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "entity: failed to get rows affected by delete for feeds")
	}

	if err := o.doAfterDeleteHooks(ctx, exec); err != nil {
		return 0, err
	}

	return rowsAff, nil
}

// DeleteAll deletes all matching rows.
func (q feedQuery) DeleteAll(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if q.Query == nil {
		return 0, errors.New("entity: no feedQuery provided for delete all")
	}

	queries.SetDelete(q.Query)

	result, err := q.Query.ExecContext(ctx, exec)
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to delete all from feeds")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "entity: failed to get rows affected by deleteall for feeds")
	}

	return rowsAff, nil
}

// DeleteAll deletes all rows in the slice, using an executor.
func (o FeedSlice) DeleteAll(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if len(o) == 0 {
		return 0, nil
	}

	if len(feedBeforeDeleteHooks) != 0 {
		for _, obj := range o {
			if err := obj.doBeforeDeleteHooks(ctx, exec); err != nil {
				return 0, err
			}
		}
	}

	var args []interface{}
	for _, obj := range o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), feedPrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := "DELETE FROM \"feeds\" WHERE " +
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), 1, feedPrimaryKeyColumns, len(o))

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "entity: unable to delete all from feed slice")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "entity: failed to get rows affected by deleteall for feeds")
	}

	if len(feedAfterDeleteHooks) != 0 {
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
func (o *Feed) Reload(ctx context.Context, exec boil.ContextExecutor) error {
	ret, err := FindFeed(ctx, exec, o.ID)
	if err != nil {
		return err
	}

	*o = *ret
	return nil
}

// ReloadAll refetches every row with matching primary key column values
// and overwrites the original object slice with the newly updated slice.
func (o *FeedSlice) ReloadAll(ctx context.Context, exec boil.ContextExecutor) error {
	if o == nil || len(*o) == 0 {
		return nil
	}

	slice := FeedSlice{}
	var args []interface{}
	for _, obj := range *o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), feedPrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := "SELECT \"feeds\".* FROM \"feeds\" WHERE " +
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), 1, feedPrimaryKeyColumns, len(*o))

	q := queries.Raw(sql, args...)

	err := q.Bind(ctx, exec, &slice)
	if err != nil {
		return errors.Wrap(err, "entity: unable to reload all in FeedSlice")
	}

	*o = slice

	return nil
}

// FeedExists checks if the Feed row exists.
func FeedExists(ctx context.Context, exec boil.ContextExecutor, iD string) (bool, error) {
	var exists bool
	sql := "select exists(select 1 from \"feeds\" where \"id\"=$1 limit 1)"

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, iD)
	}
	row := exec.QueryRowContext(ctx, sql, iD)

	err := row.Scan(&exists)
	if err != nil {
		return false, errors.Wrap(err, "entity: unable to check if feeds exists")
	}

	return exists, nil
}

// Exists checks if the Feed row exists.
func (o *Feed) Exists(ctx context.Context, exec boil.ContextExecutor) (bool, error) {
	return FeedExists(ctx, exec, o.ID)
}
