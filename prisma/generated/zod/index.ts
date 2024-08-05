import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const PuzzleSessionScalarFieldEnumSchema = z.enum(['id','title','durationSeconds','createdAt']);

export const PuzzleChatMessageScalarFieldEnumSchema = z.enum(['id','sessionId','username','message','createdAt']);

export const PuzzleScalarFieldEnumSchema = z.enum(['id','checkpoint','title','description','solved','data','typeId']);

export const PuzzleTypeScalarFieldEnumSchema = z.enum(['name','id']);

export const UserScalarFieldEnumSchema = z.enum(['id','clerkId','imgUrl','username','email','createdAt','updatedAt']);

export const FormulaScalarFieldEnumSchema = z.enum(['id','userId','name','description','rarity','ingredients']);

export const IngredientScalarFieldEnumSchema = z.enum(['id','rarity','type','primaryAttribute','name','description','quantity','abjuration','conjuration','divination','enchantment','evocation','illusion','necromancy','transmutation','userId']);

export const PotionScalarFieldEnumSchema = z.enum(['id','rarity','type','primaryAttribute','name','description','quantity','abjuration','conjuration','divination','enchantment','evocation','illusion','necromancy','transmutation','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const NullsOrderSchema = z.enum(['first','last']);

export const MagicTypeSchema = z.enum(['EMPTY','ARCANE','PRIMAL','DIVINE','OCCULT']);

export type MagicTypeType = `${z.infer<typeof MagicTypeSchema>}`

export const RaritySchema = z.enum(['EMPTY','COMMON','UNCOMMON','RARE','VERYRARE','LEGENDARY']);

export type RarityType = `${z.infer<typeof RaritySchema>}`

export const PrimaryAttributeSchema = z.enum(['EMPTY','ABJURATION','CONJURATION','DIVINATION','ENCHANTMENT','EVOCATION','ILLUSION','NECROMANCY','TRANSMUTATION']);

export type PrimaryAttributeType = `${z.infer<typeof PrimaryAttributeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PUZZLE SESSION SCHEMA
/////////////////////////////////////////

export const PuzzleSessionSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  durationSeconds: z.number().int(),
  createdAt: z.coerce.date(),
})

export type PuzzleSession = z.infer<typeof PuzzleSessionSchema>

/////////////////////////////////////////
// PUZZLE CHAT MESSAGE SCHEMA
/////////////////////////////////////////

export const PuzzleChatMessageSchema = z.object({
  id: z.string().cuid(),
  sessionId: z.string(),
  username: z.string(),
  message: z.string(),
  createdAt: z.coerce.date(),
})

export type PuzzleChatMessage = z.infer<typeof PuzzleChatMessageSchema>

/////////////////////////////////////////
// PUZZLE SCHEMA
/////////////////////////////////////////

export const PuzzleSchema = z.object({
  id: z.string().cuid(),
  checkpoint: z.number().int(),
  title: z.string(),
  description: z.string().nullable(),
  solved: z.boolean(),
  data: JsonValueSchema,
  typeId: z.string(),
})

export type Puzzle = z.infer<typeof PuzzleSchema>

/////////////////////////////////////////
// PUZZLE TYPE SCHEMA
/////////////////////////////////////////

export const PuzzleTypeSchema = z.object({
  name: z.string(),
  id: z.string().cuid(),
})

export type PuzzleType = z.infer<typeof PuzzleTypeSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  clerkId: z.string(),
  imgUrl: z.string().nullable(),
  username: z.string().nullable(),
  email: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// FORMULA SCHEMA
/////////////////////////////////////////

export const FormulaSchema = z.object({
  rarity: RaritySchema,
  id: z.string().cuid(),
  userId: z.string(),
  name: z.string(),
  description: z.string(),
  ingredients: z.string().array(),
})

export type Formula = z.infer<typeof FormulaSchema>

/////////////////////////////////////////
// INGREDIENT SCHEMA
/////////////////////////////////////////

export const IngredientSchema = z.object({
  rarity: RaritySchema,
  type: MagicTypeSchema,
  primaryAttribute: PrimaryAttributeSchema,
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int(),
  abjuration: z.number().int(),
  conjuration: z.number().int(),
  divination: z.number().int(),
  enchantment: z.number().int(),
  evocation: z.number().int(),
  illusion: z.number().int(),
  necromancy: z.number().int(),
  transmutation: z.number().int(),
  userId: z.string(),
})

export type Ingredient = z.infer<typeof IngredientSchema>

/////////////////////////////////////////
// POTION SCHEMA
/////////////////////////////////////////

export const PotionSchema = z.object({
  rarity: RaritySchema,
  type: MagicTypeSchema,
  primaryAttribute: PrimaryAttributeSchema,
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int(),
  abjuration: z.number().int(),
  conjuration: z.number().int(),
  divination: z.number().int(),
  enchantment: z.number().int(),
  evocation: z.number().int(),
  illusion: z.number().int(),
  necromancy: z.number().int(),
  transmutation: z.number().int(),
  userId: z.string(),
})

export type Potion = z.infer<typeof PotionSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PUZZLE SESSION
//------------------------------------------------------

export const PuzzleSessionIncludeSchema: z.ZodType<Prisma.PuzzleSessionInclude> = z.object({
  chat: z.union([z.boolean(),z.lazy(() => PuzzleChatMessageFindManyArgsSchema)]).optional(),
  players: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  puzzles: z.union([z.boolean(),z.lazy(() => PuzzleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PuzzleSessionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PuzzleSessionArgsSchema: z.ZodType<Prisma.PuzzleSessionDefaultArgs> = z.object({
  select: z.lazy(() => PuzzleSessionSelectSchema).optional(),
  include: z.lazy(() => PuzzleSessionIncludeSchema).optional(),
}).strict();

export const PuzzleSessionCountOutputTypeArgsSchema: z.ZodType<Prisma.PuzzleSessionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PuzzleSessionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PuzzleSessionCountOutputTypeSelectSchema: z.ZodType<Prisma.PuzzleSessionCountOutputTypeSelect> = z.object({
  chat: z.boolean().optional(),
  players: z.boolean().optional(),
  puzzles: z.boolean().optional(),
}).strict();

export const PuzzleSessionSelectSchema: z.ZodType<Prisma.PuzzleSessionSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  durationSeconds: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  chat: z.union([z.boolean(),z.lazy(() => PuzzleChatMessageFindManyArgsSchema)]).optional(),
  players: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  puzzles: z.union([z.boolean(),z.lazy(() => PuzzleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PuzzleSessionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PUZZLE CHAT MESSAGE
//------------------------------------------------------

export const PuzzleChatMessageIncludeSchema: z.ZodType<Prisma.PuzzleChatMessageInclude> = z.object({
  session: z.union([z.boolean(),z.lazy(() => PuzzleSessionArgsSchema)]).optional(),
}).strict()

export const PuzzleChatMessageArgsSchema: z.ZodType<Prisma.PuzzleChatMessageDefaultArgs> = z.object({
  select: z.lazy(() => PuzzleChatMessageSelectSchema).optional(),
  include: z.lazy(() => PuzzleChatMessageIncludeSchema).optional(),
}).strict();

export const PuzzleChatMessageSelectSchema: z.ZodType<Prisma.PuzzleChatMessageSelect> = z.object({
  id: z.boolean().optional(),
  sessionId: z.boolean().optional(),
  username: z.boolean().optional(),
  message: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  session: z.union([z.boolean(),z.lazy(() => PuzzleSessionArgsSchema)]).optional(),
}).strict()

// PUZZLE
//------------------------------------------------------

export const PuzzleIncludeSchema: z.ZodType<Prisma.PuzzleInclude> = z.object({
  type: z.union([z.boolean(),z.lazy(() => PuzzleTypeArgsSchema)]).optional(),
  session: z.union([z.boolean(),z.lazy(() => PuzzleSessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PuzzleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PuzzleArgsSchema: z.ZodType<Prisma.PuzzleDefaultArgs> = z.object({
  select: z.lazy(() => PuzzleSelectSchema).optional(),
  include: z.lazy(() => PuzzleIncludeSchema).optional(),
}).strict();

export const PuzzleCountOutputTypeArgsSchema: z.ZodType<Prisma.PuzzleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PuzzleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PuzzleCountOutputTypeSelectSchema: z.ZodType<Prisma.PuzzleCountOutputTypeSelect> = z.object({
  session: z.boolean().optional(),
}).strict();

export const PuzzleSelectSchema: z.ZodType<Prisma.PuzzleSelect> = z.object({
  id: z.boolean().optional(),
  checkpoint: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  solved: z.boolean().optional(),
  data: z.boolean().optional(),
  typeId: z.boolean().optional(),
  type: z.union([z.boolean(),z.lazy(() => PuzzleTypeArgsSchema)]).optional(),
  session: z.union([z.boolean(),z.lazy(() => PuzzleSessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PuzzleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PUZZLE TYPE
//------------------------------------------------------

export const PuzzleTypeIncludeSchema: z.ZodType<Prisma.PuzzleTypeInclude> = z.object({
  puzzles: z.union([z.boolean(),z.lazy(() => PuzzleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PuzzleTypeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PuzzleTypeArgsSchema: z.ZodType<Prisma.PuzzleTypeDefaultArgs> = z.object({
  select: z.lazy(() => PuzzleTypeSelectSchema).optional(),
  include: z.lazy(() => PuzzleTypeIncludeSchema).optional(),
}).strict();

export const PuzzleTypeCountOutputTypeArgsSchema: z.ZodType<Prisma.PuzzleTypeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PuzzleTypeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PuzzleTypeCountOutputTypeSelectSchema: z.ZodType<Prisma.PuzzleTypeCountOutputTypeSelect> = z.object({
  puzzles: z.boolean().optional(),
}).strict();

export const PuzzleTypeSelectSchema: z.ZodType<Prisma.PuzzleTypeSelect> = z.object({
  name: z.boolean().optional(),
  id: z.boolean().optional(),
  puzzles: z.union([z.boolean(),z.lazy(() => PuzzleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PuzzleTypeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  puzzleSessions: z.union([z.boolean(),z.lazy(() => PuzzleSessionFindManyArgsSchema)]).optional(),
  Ingredients: z.union([z.boolean(),z.lazy(() => IngredientFindManyArgsSchema)]).optional(),
  Potions: z.union([z.boolean(),z.lazy(() => PotionFindManyArgsSchema)]).optional(),
  Formulas: z.union([z.boolean(),z.lazy(() => FormulaFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  puzzleSessions: z.boolean().optional(),
  Ingredients: z.boolean().optional(),
  Potions: z.boolean().optional(),
  Formulas: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  clerkId: z.boolean().optional(),
  imgUrl: z.boolean().optional(),
  username: z.boolean().optional(),
  email: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  puzzleSessions: z.union([z.boolean(),z.lazy(() => PuzzleSessionFindManyArgsSchema)]).optional(),
  Ingredients: z.union([z.boolean(),z.lazy(() => IngredientFindManyArgsSchema)]).optional(),
  Potions: z.union([z.boolean(),z.lazy(() => PotionFindManyArgsSchema)]).optional(),
  Formulas: z.union([z.boolean(),z.lazy(() => FormulaFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FORMULA
//------------------------------------------------------

export const FormulaIncludeSchema: z.ZodType<Prisma.FormulaInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const FormulaArgsSchema: z.ZodType<Prisma.FormulaDefaultArgs> = z.object({
  select: z.lazy(() => FormulaSelectSchema).optional(),
  include: z.lazy(() => FormulaIncludeSchema).optional(),
}).strict();

export const FormulaSelectSchema: z.ZodType<Prisma.FormulaSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  rarity: z.boolean().optional(),
  ingredients: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// INGREDIENT
//------------------------------------------------------

export const IngredientIncludeSchema: z.ZodType<Prisma.IngredientInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const IngredientArgsSchema: z.ZodType<Prisma.IngredientDefaultArgs> = z.object({
  select: z.lazy(() => IngredientSelectSchema).optional(),
  include: z.lazy(() => IngredientIncludeSchema).optional(),
}).strict();

export const IngredientSelectSchema: z.ZodType<Prisma.IngredientSelect> = z.object({
  id: z.boolean().optional(),
  rarity: z.boolean().optional(),
  type: z.boolean().optional(),
  primaryAttribute: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  quantity: z.boolean().optional(),
  abjuration: z.boolean().optional(),
  conjuration: z.boolean().optional(),
  divination: z.boolean().optional(),
  enchantment: z.boolean().optional(),
  evocation: z.boolean().optional(),
  illusion: z.boolean().optional(),
  necromancy: z.boolean().optional(),
  transmutation: z.boolean().optional(),
  userId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// POTION
//------------------------------------------------------

export const PotionIncludeSchema: z.ZodType<Prisma.PotionInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PotionArgsSchema: z.ZodType<Prisma.PotionDefaultArgs> = z.object({
  select: z.lazy(() => PotionSelectSchema).optional(),
  include: z.lazy(() => PotionIncludeSchema).optional(),
}).strict();

export const PotionSelectSchema: z.ZodType<Prisma.PotionSelect> = z.object({
  id: z.boolean().optional(),
  rarity: z.boolean().optional(),
  type: z.boolean().optional(),
  primaryAttribute: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  quantity: z.boolean().optional(),
  abjuration: z.boolean().optional(),
  conjuration: z.boolean().optional(),
  divination: z.boolean().optional(),
  enchantment: z.boolean().optional(),
  evocation: z.boolean().optional(),
  illusion: z.boolean().optional(),
  necromancy: z.boolean().optional(),
  transmutation: z.boolean().optional(),
  userId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const PuzzleSessionWhereInputSchema: z.ZodType<Prisma.PuzzleSessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleSessionWhereInputSchema),z.lazy(() => PuzzleSessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleSessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleSessionWhereInputSchema),z.lazy(() => PuzzleSessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  durationSeconds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageListRelationFilterSchema).optional(),
  players: z.lazy(() => UserListRelationFilterSchema).optional(),
  puzzles: z.lazy(() => PuzzleListRelationFilterSchema).optional()
}).strict();

export const PuzzleSessionOrderByWithRelationInputSchema: z.ZodType<Prisma.PuzzleSessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  chat: z.lazy(() => PuzzleChatMessageOrderByRelationAggregateInputSchema).optional(),
  players: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  puzzles: z.lazy(() => PuzzleOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PuzzleSessionWhereUniqueInputSchema: z.ZodType<Prisma.PuzzleSessionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PuzzleSessionWhereInputSchema),z.lazy(() => PuzzleSessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleSessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleSessionWhereInputSchema),z.lazy(() => PuzzleSessionWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  durationSeconds: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageListRelationFilterSchema).optional(),
  players: z.lazy(() => UserListRelationFilterSchema).optional(),
  puzzles: z.lazy(() => PuzzleListRelationFilterSchema).optional()
}).strict());

export const PuzzleSessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PuzzleSessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PuzzleSessionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PuzzleSessionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PuzzleSessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PuzzleSessionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PuzzleSessionSumOrderByAggregateInputSchema).optional()
}).strict();

export const PuzzleSessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PuzzleSessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleSessionScalarWhereWithAggregatesInputSchema),z.lazy(() => PuzzleSessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleSessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleSessionScalarWhereWithAggregatesInputSchema),z.lazy(() => PuzzleSessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  durationSeconds: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PuzzleChatMessageWhereInputSchema: z.ZodType<Prisma.PuzzleChatMessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleChatMessageWhereInputSchema),z.lazy(() => PuzzleChatMessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleChatMessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleChatMessageWhereInputSchema),z.lazy(() => PuzzleChatMessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  session: z.union([ z.lazy(() => PuzzleSessionRelationFilterSchema),z.lazy(() => PuzzleSessionWhereInputSchema) ]).optional(),
}).strict();

export const PuzzleChatMessageOrderByWithRelationInputSchema: z.ZodType<Prisma.PuzzleChatMessageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  session: z.lazy(() => PuzzleSessionOrderByWithRelationInputSchema).optional()
}).strict();

export const PuzzleChatMessageWhereUniqueInputSchema: z.ZodType<Prisma.PuzzleChatMessageWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PuzzleChatMessageWhereInputSchema),z.lazy(() => PuzzleChatMessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleChatMessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleChatMessageWhereInputSchema),z.lazy(() => PuzzleChatMessageWhereInputSchema).array() ]).optional(),
  sessionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  session: z.union([ z.lazy(() => PuzzleSessionRelationFilterSchema),z.lazy(() => PuzzleSessionWhereInputSchema) ]).optional(),
}).strict());

export const PuzzleChatMessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.PuzzleChatMessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PuzzleChatMessageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PuzzleChatMessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PuzzleChatMessageMinOrderByAggregateInputSchema).optional()
}).strict();

export const PuzzleChatMessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PuzzleChatMessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleChatMessageScalarWhereWithAggregatesInputSchema),z.lazy(() => PuzzleChatMessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleChatMessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleChatMessageScalarWhereWithAggregatesInputSchema),z.lazy(() => PuzzleChatMessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PuzzleWhereInputSchema: z.ZodType<Prisma.PuzzleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleWhereInputSchema),z.lazy(() => PuzzleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleWhereInputSchema),z.lazy(() => PuzzleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  checkpoint: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  solved: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  data: z.lazy(() => JsonFilterSchema).optional(),
  typeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => PuzzleTypeRelationFilterSchema),z.lazy(() => PuzzleTypeWhereInputSchema) ]).optional(),
  session: z.lazy(() => PuzzleSessionListRelationFilterSchema).optional()
}).strict();

export const PuzzleOrderByWithRelationInputSchema: z.ZodType<Prisma.PuzzleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  checkpoint: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  solved: z.lazy(() => SortOrderSchema).optional(),
  data: z.lazy(() => SortOrderSchema).optional(),
  typeId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => PuzzleTypeOrderByWithRelationInputSchema).optional(),
  session: z.lazy(() => PuzzleSessionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PuzzleWhereUniqueInputSchema: z.ZodType<Prisma.PuzzleWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PuzzleWhereInputSchema),z.lazy(() => PuzzleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleWhereInputSchema),z.lazy(() => PuzzleWhereInputSchema).array() ]).optional(),
  checkpoint: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  solved: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  data: z.lazy(() => JsonFilterSchema).optional(),
  typeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => PuzzleTypeRelationFilterSchema),z.lazy(() => PuzzleTypeWhereInputSchema) ]).optional(),
  session: z.lazy(() => PuzzleSessionListRelationFilterSchema).optional()
}).strict());

export const PuzzleOrderByWithAggregationInputSchema: z.ZodType<Prisma.PuzzleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  checkpoint: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  solved: z.lazy(() => SortOrderSchema).optional(),
  data: z.lazy(() => SortOrderSchema).optional(),
  typeId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PuzzleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PuzzleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PuzzleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PuzzleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PuzzleSumOrderByAggregateInputSchema).optional()
}).strict();

export const PuzzleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PuzzleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleScalarWhereWithAggregatesInputSchema),z.lazy(() => PuzzleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleScalarWhereWithAggregatesInputSchema),z.lazy(() => PuzzleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  checkpoint: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  solved: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  data: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  typeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PuzzleTypeWhereInputSchema: z.ZodType<Prisma.PuzzleTypeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleTypeWhereInputSchema),z.lazy(() => PuzzleTypeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleTypeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleTypeWhereInputSchema),z.lazy(() => PuzzleTypeWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  puzzles: z.lazy(() => PuzzleListRelationFilterSchema).optional()
}).strict();

export const PuzzleTypeOrderByWithRelationInputSchema: z.ZodType<Prisma.PuzzleTypeOrderByWithRelationInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  puzzles: z.lazy(() => PuzzleOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PuzzleTypeWhereUniqueInputSchema: z.ZodType<Prisma.PuzzleTypeWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PuzzleTypeWhereInputSchema),z.lazy(() => PuzzleTypeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleTypeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleTypeWhereInputSchema),z.lazy(() => PuzzleTypeWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  puzzles: z.lazy(() => PuzzleListRelationFilterSchema).optional()
}).strict());

export const PuzzleTypeOrderByWithAggregationInputSchema: z.ZodType<Prisma.PuzzleTypeOrderByWithAggregationInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PuzzleTypeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PuzzleTypeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PuzzleTypeMinOrderByAggregateInputSchema).optional()
}).strict();

export const PuzzleTypeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PuzzleTypeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleTypeScalarWhereWithAggregatesInputSchema),z.lazy(() => PuzzleTypeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleTypeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleTypeScalarWhereWithAggregatesInputSchema),z.lazy(() => PuzzleTypeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clerkId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imgUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionListRelationFilterSchema).optional(),
  Ingredients: z.lazy(() => IngredientListRelationFilterSchema).optional(),
  Potions: z.lazy(() => PotionListRelationFilterSchema).optional(),
  Formulas: z.lazy(() => FormulaListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkId: z.lazy(() => SortOrderSchema).optional(),
  imgUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionOrderByRelationAggregateInputSchema).optional(),
  Ingredients: z.lazy(() => IngredientOrderByRelationAggregateInputSchema).optional(),
  Potions: z.lazy(() => PotionOrderByRelationAggregateInputSchema).optional(),
  Formulas: z.lazy(() => FormulaOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    clerkId: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    clerkId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    clerkId: z.string(),
    email: z.string(),
  }),
  z.object({
    clerkId: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  imgUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionListRelationFilterSchema).optional(),
  Ingredients: z.lazy(() => IngredientListRelationFilterSchema).optional(),
  Potions: z.lazy(() => PotionListRelationFilterSchema).optional(),
  Formulas: z.lazy(() => FormulaListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkId: z.lazy(() => SortOrderSchema).optional(),
  imgUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  clerkId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  imgUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FormulaWhereInputSchema: z.ZodType<Prisma.FormulaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FormulaWhereInputSchema),z.lazy(() => FormulaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormulaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormulaWhereInputSchema),z.lazy(() => FormulaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rarity: z.union([ z.lazy(() => EnumRarityFilterSchema),z.lazy(() => RaritySchema) ]).optional(),
  ingredients: z.lazy(() => StringNullableListFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const FormulaOrderByWithRelationInputSchema: z.ZodType<Prisma.FormulaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  ingredients: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const FormulaWhereUniqueInputSchema: z.ZodType<Prisma.FormulaWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => FormulaWhereInputSchema),z.lazy(() => FormulaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormulaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormulaWhereInputSchema),z.lazy(() => FormulaWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rarity: z.union([ z.lazy(() => EnumRarityFilterSchema),z.lazy(() => RaritySchema) ]).optional(),
  ingredients: z.lazy(() => StringNullableListFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const FormulaOrderByWithAggregationInputSchema: z.ZodType<Prisma.FormulaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  ingredients: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FormulaCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FormulaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FormulaMinOrderByAggregateInputSchema).optional()
}).strict();

export const FormulaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FormulaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FormulaScalarWhereWithAggregatesInputSchema),z.lazy(() => FormulaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormulaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormulaScalarWhereWithAggregatesInputSchema),z.lazy(() => FormulaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rarity: z.union([ z.lazy(() => EnumRarityWithAggregatesFilterSchema),z.lazy(() => RaritySchema) ]).optional(),
  ingredients: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const IngredientWhereInputSchema: z.ZodType<Prisma.IngredientWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IngredientWhereInputSchema),z.lazy(() => IngredientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IngredientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IngredientWhereInputSchema),z.lazy(() => IngredientWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rarity: z.union([ z.lazy(() => EnumRarityFilterSchema),z.lazy(() => RaritySchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumMagicTypeFilterSchema),z.lazy(() => MagicTypeSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => EnumPrimaryAttributeFilterSchema),z.lazy(() => PrimaryAttributeSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  abjuration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  conjuration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  divination: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  enchantment: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  evocation: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  illusion: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  necromancy: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  transmutation: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const IngredientOrderByWithRelationInputSchema: z.ZodType<Prisma.IngredientOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  primaryAttribute: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const IngredientWhereUniqueInputSchema: z.ZodType<Prisma.IngredientWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => IngredientWhereInputSchema),z.lazy(() => IngredientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IngredientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IngredientWhereInputSchema),z.lazy(() => IngredientWhereInputSchema).array() ]).optional(),
  rarity: z.union([ z.lazy(() => EnumRarityFilterSchema),z.lazy(() => RaritySchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumMagicTypeFilterSchema),z.lazy(() => MagicTypeSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => EnumPrimaryAttributeFilterSchema),z.lazy(() => PrimaryAttributeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  abjuration: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  conjuration: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  divination: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  enchantment: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  evocation: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  illusion: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  necromancy: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  transmutation: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const IngredientOrderByWithAggregationInputSchema: z.ZodType<Prisma.IngredientOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  primaryAttribute: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => IngredientCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => IngredientAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IngredientMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IngredientMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => IngredientSumOrderByAggregateInputSchema).optional()
}).strict();

export const IngredientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IngredientScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IngredientScalarWhereWithAggregatesInputSchema),z.lazy(() => IngredientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IngredientScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IngredientScalarWhereWithAggregatesInputSchema),z.lazy(() => IngredientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rarity: z.union([ z.lazy(() => EnumRarityWithAggregatesFilterSchema),z.lazy(() => RaritySchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumMagicTypeWithAggregatesFilterSchema),z.lazy(() => MagicTypeSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => EnumPrimaryAttributeWithAggregatesFilterSchema),z.lazy(() => PrimaryAttributeSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  abjuration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  conjuration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  divination: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  enchantment: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  evocation: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  illusion: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  necromancy: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  transmutation: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PotionWhereInputSchema: z.ZodType<Prisma.PotionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PotionWhereInputSchema),z.lazy(() => PotionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PotionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PotionWhereInputSchema),z.lazy(() => PotionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rarity: z.union([ z.lazy(() => EnumRarityFilterSchema),z.lazy(() => RaritySchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumMagicTypeFilterSchema),z.lazy(() => MagicTypeSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => EnumPrimaryAttributeFilterSchema),z.lazy(() => PrimaryAttributeSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  abjuration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  conjuration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  divination: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  enchantment: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  evocation: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  illusion: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  necromancy: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  transmutation: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PotionOrderByWithRelationInputSchema: z.ZodType<Prisma.PotionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  primaryAttribute: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PotionWhereUniqueInputSchema: z.ZodType<Prisma.PotionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PotionWhereInputSchema),z.lazy(() => PotionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PotionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PotionWhereInputSchema),z.lazy(() => PotionWhereInputSchema).array() ]).optional(),
  rarity: z.union([ z.lazy(() => EnumRarityFilterSchema),z.lazy(() => RaritySchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumMagicTypeFilterSchema),z.lazy(() => MagicTypeSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => EnumPrimaryAttributeFilterSchema),z.lazy(() => PrimaryAttributeSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  abjuration: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  conjuration: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  divination: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  enchantment: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  evocation: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  illusion: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  necromancy: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  transmutation: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const PotionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PotionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  primaryAttribute: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PotionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PotionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PotionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PotionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PotionSumOrderByAggregateInputSchema).optional()
}).strict();

export const PotionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PotionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PotionScalarWhereWithAggregatesInputSchema),z.lazy(() => PotionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PotionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PotionScalarWhereWithAggregatesInputSchema),z.lazy(() => PotionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rarity: z.union([ z.lazy(() => EnumRarityWithAggregatesFilterSchema),z.lazy(() => RaritySchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumMagicTypeWithAggregatesFilterSchema),z.lazy(() => MagicTypeSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => EnumPrimaryAttributeWithAggregatesFilterSchema),z.lazy(() => PrimaryAttributeSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  abjuration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  conjuration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  divination: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  enchantment: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  evocation: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  illusion: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  necromancy: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  transmutation: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PuzzleSessionCreateInputSchema: z.ZodType<Prisma.PuzzleSessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  durationSeconds: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  chat: z.lazy(() => PuzzleChatMessageCreateNestedManyWithoutSessionInputSchema).optional(),
  players: z.lazy(() => UserCreateNestedManyWithoutPuzzleSessionsInputSchema).optional(),
  puzzles: z.lazy(() => PuzzleCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const PuzzleSessionUncheckedCreateInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  durationSeconds: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  chat: z.lazy(() => PuzzleChatMessageUncheckedCreateNestedManyWithoutSessionInputSchema).optional(),
  players: z.lazy(() => UserUncheckedCreateNestedManyWithoutPuzzleSessionsInputSchema).optional(),
  puzzles: z.lazy(() => PuzzleUncheckedCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const PuzzleSessionUpdateInputSchema: z.ZodType<Prisma.PuzzleSessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageUpdateManyWithoutSessionNestedInputSchema).optional(),
  players: z.lazy(() => UserUpdateManyWithoutPuzzleSessionsNestedInputSchema).optional(),
  puzzles: z.lazy(() => PuzzleUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const PuzzleSessionUncheckedUpdateInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageUncheckedUpdateManyWithoutSessionNestedInputSchema).optional(),
  players: z.lazy(() => UserUncheckedUpdateManyWithoutPuzzleSessionsNestedInputSchema).optional(),
  puzzles: z.lazy(() => PuzzleUncheckedUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const PuzzleSessionCreateManyInputSchema: z.ZodType<Prisma.PuzzleSessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  durationSeconds: z.number().int().optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PuzzleSessionUpdateManyMutationInputSchema: z.ZodType<Prisma.PuzzleSessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleSessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleChatMessageCreateInputSchema: z.ZodType<Prisma.PuzzleChatMessageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  message: z.string(),
  createdAt: z.coerce.date().optional(),
  session: z.lazy(() => PuzzleSessionCreateNestedOneWithoutChatInputSchema)
}).strict();

export const PuzzleChatMessageUncheckedCreateInputSchema: z.ZodType<Prisma.PuzzleChatMessageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionId: z.string(),
  username: z.string(),
  message: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PuzzleChatMessageUpdateInputSchema: z.ZodType<Prisma.PuzzleChatMessageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  session: z.lazy(() => PuzzleSessionUpdateOneRequiredWithoutChatNestedInputSchema).optional()
}).strict();

export const PuzzleChatMessageUncheckedUpdateInputSchema: z.ZodType<Prisma.PuzzleChatMessageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleChatMessageCreateManyInputSchema: z.ZodType<Prisma.PuzzleChatMessageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionId: z.string(),
  username: z.string(),
  message: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PuzzleChatMessageUpdateManyMutationInputSchema: z.ZodType<Prisma.PuzzleChatMessageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleChatMessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PuzzleChatMessageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleCreateInputSchema: z.ZodType<Prisma.PuzzleCreateInput> = z.object({
  id: z.string().cuid().optional(),
  checkpoint: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  solved: z.boolean(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  type: z.lazy(() => PuzzleTypeCreateNestedOneWithoutPuzzlesInputSchema),
  session: z.lazy(() => PuzzleSessionCreateNestedManyWithoutPuzzlesInputSchema).optional()
}).strict();

export const PuzzleUncheckedCreateInputSchema: z.ZodType<Prisma.PuzzleUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  checkpoint: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  solved: z.boolean(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  typeId: z.string(),
  session: z.lazy(() => PuzzleSessionUncheckedCreateNestedManyWithoutPuzzlesInputSchema).optional()
}).strict();

export const PuzzleUpdateInputSchema: z.ZodType<Prisma.PuzzleUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkpoint: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  solved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  type: z.lazy(() => PuzzleTypeUpdateOneRequiredWithoutPuzzlesNestedInputSchema).optional(),
  session: z.lazy(() => PuzzleSessionUpdateManyWithoutPuzzlesNestedInputSchema).optional()
}).strict();

export const PuzzleUncheckedUpdateInputSchema: z.ZodType<Prisma.PuzzleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkpoint: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  solved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  typeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session: z.lazy(() => PuzzleSessionUncheckedUpdateManyWithoutPuzzlesNestedInputSchema).optional()
}).strict();

export const PuzzleCreateManyInputSchema: z.ZodType<Prisma.PuzzleCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  checkpoint: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  solved: z.boolean(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  typeId: z.string()
}).strict();

export const PuzzleUpdateManyMutationInputSchema: z.ZodType<Prisma.PuzzleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkpoint: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  solved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PuzzleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PuzzleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkpoint: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  solved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  typeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleTypeCreateInputSchema: z.ZodType<Prisma.PuzzleTypeCreateInput> = z.object({
  name: z.string(),
  id: z.string().cuid().optional(),
  puzzles: z.lazy(() => PuzzleCreateNestedManyWithoutTypeInputSchema).optional()
}).strict();

export const PuzzleTypeUncheckedCreateInputSchema: z.ZodType<Prisma.PuzzleTypeUncheckedCreateInput> = z.object({
  name: z.string(),
  id: z.string().cuid().optional(),
  puzzles: z.lazy(() => PuzzleUncheckedCreateNestedManyWithoutTypeInputSchema).optional()
}).strict();

export const PuzzleTypeUpdateInputSchema: z.ZodType<Prisma.PuzzleTypeUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puzzles: z.lazy(() => PuzzleUpdateManyWithoutTypeNestedInputSchema).optional()
}).strict();

export const PuzzleTypeUncheckedUpdateInputSchema: z.ZodType<Prisma.PuzzleTypeUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puzzles: z.lazy(() => PuzzleUncheckedUpdateManyWithoutTypeNestedInputSchema).optional()
}).strict();

export const PuzzleTypeCreateManyInputSchema: z.ZodType<Prisma.PuzzleTypeCreateManyInput> = z.object({
  name: z.string(),
  id: z.string().cuid().optional()
}).strict();

export const PuzzleTypeUpdateManyMutationInputSchema: z.ZodType<Prisma.PuzzleTypeUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleTypeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PuzzleTypeUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string(),
  imgUrl: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionCreateNestedManyWithoutPlayersInputSchema).optional(),
  Ingredients: z.lazy(() => IngredientCreateNestedManyWithoutUserInputSchema).optional(),
  Potions: z.lazy(() => PotionCreateNestedManyWithoutUserInputSchema).optional(),
  Formulas: z.lazy(() => FormulaCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string(),
  imgUrl: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionUncheckedCreateNestedManyWithoutPlayersInputSchema).optional(),
  Ingredients: z.lazy(() => IngredientUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Potions: z.lazy(() => PotionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Formulas: z.lazy(() => FormulaUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionUpdateManyWithoutPlayersNestedInputSchema).optional(),
  Ingredients: z.lazy(() => IngredientUpdateManyWithoutUserNestedInputSchema).optional(),
  Potions: z.lazy(() => PotionUpdateManyWithoutUserNestedInputSchema).optional(),
  Formulas: z.lazy(() => FormulaUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionUncheckedUpdateManyWithoutPlayersNestedInputSchema).optional(),
  Ingredients: z.lazy(() => IngredientUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Potions: z.lazy(() => PotionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Formulas: z.lazy(() => FormulaUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string(),
  imgUrl: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormulaCreateInputSchema: z.ZodType<Prisma.FormulaCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  rarity: z.lazy(() => RaritySchema).optional(),
  ingredients: z.union([ z.lazy(() => FormulaCreateingredientsInputSchema),z.string().array() ]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFormulasInputSchema)
}).strict();

export const FormulaUncheckedCreateInputSchema: z.ZodType<Prisma.FormulaUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  name: z.string(),
  description: z.string(),
  rarity: z.lazy(() => RaritySchema).optional(),
  ingredients: z.union([ z.lazy(() => FormulaCreateingredientsInputSchema),z.string().array() ]).optional(),
}).strict();

export const FormulaUpdateInputSchema: z.ZodType<Prisma.FormulaUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  ingredients: z.union([ z.lazy(() => FormulaUpdateingredientsInputSchema),z.string().array() ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFormulasNestedInputSchema).optional()
}).strict();

export const FormulaUncheckedUpdateInputSchema: z.ZodType<Prisma.FormulaUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  ingredients: z.union([ z.lazy(() => FormulaUpdateingredientsInputSchema),z.string().array() ]).optional(),
}).strict();

export const FormulaCreateManyInputSchema: z.ZodType<Prisma.FormulaCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  name: z.string(),
  description: z.string(),
  rarity: z.lazy(() => RaritySchema).optional(),
  ingredients: z.union([ z.lazy(() => FormulaCreateingredientsInputSchema),z.string().array() ]).optional(),
}).strict();

export const FormulaUpdateManyMutationInputSchema: z.ZodType<Prisma.FormulaUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  ingredients: z.union([ z.lazy(() => FormulaUpdateingredientsInputSchema),z.string().array() ]).optional(),
}).strict();

export const FormulaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FormulaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  ingredients: z.union([ z.lazy(() => FormulaUpdateingredientsInputSchema),z.string().array() ]).optional(),
}).strict();

export const IngredientCreateInputSchema: z.ZodType<Prisma.IngredientCreateInput> = z.object({
  id: z.string().cuid().optional(),
  rarity: z.lazy(() => RaritySchema).optional(),
  type: z.lazy(() => MagicTypeSchema).optional(),
  primaryAttribute: z.lazy(() => PrimaryAttributeSchema).optional(),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int().optional(),
  abjuration: z.number().int().optional(),
  conjuration: z.number().int().optional(),
  divination: z.number().int().optional(),
  enchantment: z.number().int().optional(),
  evocation: z.number().int().optional(),
  illusion: z.number().int().optional(),
  necromancy: z.number().int().optional(),
  transmutation: z.number().int().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutIngredientsInputSchema)
}).strict();

export const IngredientUncheckedCreateInputSchema: z.ZodType<Prisma.IngredientUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  rarity: z.lazy(() => RaritySchema).optional(),
  type: z.lazy(() => MagicTypeSchema).optional(),
  primaryAttribute: z.lazy(() => PrimaryAttributeSchema).optional(),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int().optional(),
  abjuration: z.number().int().optional(),
  conjuration: z.number().int().optional(),
  divination: z.number().int().optional(),
  enchantment: z.number().int().optional(),
  evocation: z.number().int().optional(),
  illusion: z.number().int().optional(),
  necromancy: z.number().int().optional(),
  transmutation: z.number().int().optional(),
  userId: z.string()
}).strict();

export const IngredientUpdateInputSchema: z.ZodType<Prisma.IngredientUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutIngredientsNestedInputSchema).optional()
}).strict();

export const IngredientUncheckedUpdateInputSchema: z.ZodType<Prisma.IngredientUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IngredientCreateManyInputSchema: z.ZodType<Prisma.IngredientCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  rarity: z.lazy(() => RaritySchema).optional(),
  type: z.lazy(() => MagicTypeSchema).optional(),
  primaryAttribute: z.lazy(() => PrimaryAttributeSchema).optional(),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int().optional(),
  abjuration: z.number().int().optional(),
  conjuration: z.number().int().optional(),
  divination: z.number().int().optional(),
  enchantment: z.number().int().optional(),
  evocation: z.number().int().optional(),
  illusion: z.number().int().optional(),
  necromancy: z.number().int().optional(),
  transmutation: z.number().int().optional(),
  userId: z.string()
}).strict();

export const IngredientUpdateManyMutationInputSchema: z.ZodType<Prisma.IngredientUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IngredientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IngredientUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PotionCreateInputSchema: z.ZodType<Prisma.PotionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  rarity: z.lazy(() => RaritySchema).optional(),
  type: z.lazy(() => MagicTypeSchema).optional(),
  primaryAttribute: z.lazy(() => PrimaryAttributeSchema),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int().optional(),
  abjuration: z.number().int().optional(),
  conjuration: z.number().int().optional(),
  divination: z.number().int().optional(),
  enchantment: z.number().int().optional(),
  evocation: z.number().int().optional(),
  illusion: z.number().int().optional(),
  necromancy: z.number().int().optional(),
  transmutation: z.number().int().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutPotionsInputSchema)
}).strict();

export const PotionUncheckedCreateInputSchema: z.ZodType<Prisma.PotionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  rarity: z.lazy(() => RaritySchema).optional(),
  type: z.lazy(() => MagicTypeSchema).optional(),
  primaryAttribute: z.lazy(() => PrimaryAttributeSchema),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int().optional(),
  abjuration: z.number().int().optional(),
  conjuration: z.number().int().optional(),
  divination: z.number().int().optional(),
  enchantment: z.number().int().optional(),
  evocation: z.number().int().optional(),
  illusion: z.number().int().optional(),
  necromancy: z.number().int().optional(),
  transmutation: z.number().int().optional(),
  userId: z.string()
}).strict();

export const PotionUpdateInputSchema: z.ZodType<Prisma.PotionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutPotionsNestedInputSchema).optional()
}).strict();

export const PotionUncheckedUpdateInputSchema: z.ZodType<Prisma.PotionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PotionCreateManyInputSchema: z.ZodType<Prisma.PotionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  rarity: z.lazy(() => RaritySchema).optional(),
  type: z.lazy(() => MagicTypeSchema).optional(),
  primaryAttribute: z.lazy(() => PrimaryAttributeSchema),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int().optional(),
  abjuration: z.number().int().optional(),
  conjuration: z.number().int().optional(),
  divination: z.number().int().optional(),
  enchantment: z.number().int().optional(),
  evocation: z.number().int().optional(),
  illusion: z.number().int().optional(),
  necromancy: z.number().int().optional(),
  transmutation: z.number().int().optional(),
  userId: z.string()
}).strict();

export const PotionUpdateManyMutationInputSchema: z.ZodType<Prisma.PotionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PotionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PotionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const PuzzleChatMessageListRelationFilterSchema: z.ZodType<Prisma.PuzzleChatMessageListRelationFilter> = z.object({
  every: z.lazy(() => PuzzleChatMessageWhereInputSchema).optional(),
  some: z.lazy(() => PuzzleChatMessageWhereInputSchema).optional(),
  none: z.lazy(() => PuzzleChatMessageWhereInputSchema).optional()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const PuzzleListRelationFilterSchema: z.ZodType<Prisma.PuzzleListRelationFilter> = z.object({
  every: z.lazy(() => PuzzleWhereInputSchema).optional(),
  some: z.lazy(() => PuzzleWhereInputSchema).optional(),
  none: z.lazy(() => PuzzleWhereInputSchema).optional()
}).strict();

export const PuzzleChatMessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PuzzleChatMessageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PuzzleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleSessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleSessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleSessionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleSessionAvgOrderByAggregateInput> = z.object({
  durationSeconds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleSessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleSessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleSessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleSessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleSessionSumOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleSessionSumOrderByAggregateInput> = z.object({
  durationSeconds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const PuzzleSessionRelationFilterSchema: z.ZodType<Prisma.PuzzleSessionRelationFilter> = z.object({
  is: z.lazy(() => PuzzleSessionWhereInputSchema).optional(),
  isNot: z.lazy(() => PuzzleSessionWhereInputSchema).optional()
}).strict();

export const PuzzleChatMessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleChatMessageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleChatMessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleChatMessageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleChatMessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleChatMessageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const PuzzleTypeRelationFilterSchema: z.ZodType<Prisma.PuzzleTypeRelationFilter> = z.object({
  is: z.lazy(() => PuzzleTypeWhereInputSchema).optional(),
  isNot: z.lazy(() => PuzzleTypeWhereInputSchema).optional()
}).strict();

export const PuzzleSessionListRelationFilterSchema: z.ZodType<Prisma.PuzzleSessionListRelationFilter> = z.object({
  every: z.lazy(() => PuzzleSessionWhereInputSchema).optional(),
  some: z.lazy(() => PuzzleSessionWhereInputSchema).optional(),
  none: z.lazy(() => PuzzleSessionWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const PuzzleSessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PuzzleSessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleCountOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  checkpoint: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  solved: z.lazy(() => SortOrderSchema).optional(),
  data: z.lazy(() => SortOrderSchema).optional(),
  typeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleAvgOrderByAggregateInput> = z.object({
  checkpoint: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  checkpoint: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  solved: z.lazy(() => SortOrderSchema).optional(),
  typeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleMinOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  checkpoint: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  solved: z.lazy(() => SortOrderSchema).optional(),
  typeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleSumOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleSumOrderByAggregateInput> = z.object({
  checkpoint: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const PuzzleTypeCountOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleTypeCountOrderByAggregateInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleTypeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleTypeMaxOrderByAggregateInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleTypeMinOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleTypeMinOrderByAggregateInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IngredientListRelationFilterSchema: z.ZodType<Prisma.IngredientListRelationFilter> = z.object({
  every: z.lazy(() => IngredientWhereInputSchema).optional(),
  some: z.lazy(() => IngredientWhereInputSchema).optional(),
  none: z.lazy(() => IngredientWhereInputSchema).optional()
}).strict();

export const PotionListRelationFilterSchema: z.ZodType<Prisma.PotionListRelationFilter> = z.object({
  every: z.lazy(() => PotionWhereInputSchema).optional(),
  some: z.lazy(() => PotionWhereInputSchema).optional(),
  none: z.lazy(() => PotionWhereInputSchema).optional()
}).strict();

export const FormulaListRelationFilterSchema: z.ZodType<Prisma.FormulaListRelationFilter> = z.object({
  every: z.lazy(() => FormulaWhereInputSchema).optional(),
  some: z.lazy(() => FormulaWhereInputSchema).optional(),
  none: z.lazy(() => FormulaWhereInputSchema).optional()
}).strict();

export const IngredientOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IngredientOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PotionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PotionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormulaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FormulaOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkId: z.lazy(() => SortOrderSchema).optional(),
  imgUrl: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkId: z.lazy(() => SortOrderSchema).optional(),
  imgUrl: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkId: z.lazy(() => SortOrderSchema).optional(),
  imgUrl: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRarityFilterSchema: z.ZodType<Prisma.EnumRarityFilter> = z.object({
  equals: z.lazy(() => RaritySchema).optional(),
  in: z.lazy(() => RaritySchema).array().optional(),
  notIn: z.lazy(() => RaritySchema).array().optional(),
  not: z.union([ z.lazy(() => RaritySchema),z.lazy(() => NestedEnumRarityFilterSchema) ]).optional(),
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const FormulaCountOrderByAggregateInputSchema: z.ZodType<Prisma.FormulaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  ingredients: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormulaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FormulaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormulaMinOrderByAggregateInputSchema: z.ZodType<Prisma.FormulaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRarityWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRarityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RaritySchema).optional(),
  in: z.lazy(() => RaritySchema).array().optional(),
  notIn: z.lazy(() => RaritySchema).array().optional(),
  not: z.union([ z.lazy(() => RaritySchema),z.lazy(() => NestedEnumRarityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRarityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRarityFilterSchema).optional()
}).strict();

export const EnumMagicTypeFilterSchema: z.ZodType<Prisma.EnumMagicTypeFilter> = z.object({
  equals: z.lazy(() => MagicTypeSchema).optional(),
  in: z.lazy(() => MagicTypeSchema).array().optional(),
  notIn: z.lazy(() => MagicTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => NestedEnumMagicTypeFilterSchema) ]).optional(),
}).strict();

export const EnumPrimaryAttributeFilterSchema: z.ZodType<Prisma.EnumPrimaryAttributeFilter> = z.object({
  equals: z.lazy(() => PrimaryAttributeSchema).optional(),
  in: z.lazy(() => PrimaryAttributeSchema).array().optional(),
  notIn: z.lazy(() => PrimaryAttributeSchema).array().optional(),
  not: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => NestedEnumPrimaryAttributeFilterSchema) ]).optional(),
}).strict();

export const IngredientCountOrderByAggregateInputSchema: z.ZodType<Prisma.IngredientCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  primaryAttribute: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IngredientAvgOrderByAggregateInputSchema: z.ZodType<Prisma.IngredientAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IngredientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IngredientMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  primaryAttribute: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IngredientMinOrderByAggregateInputSchema: z.ZodType<Prisma.IngredientMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  primaryAttribute: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IngredientSumOrderByAggregateInputSchema: z.ZodType<Prisma.IngredientSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumMagicTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMagicTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MagicTypeSchema).optional(),
  in: z.lazy(() => MagicTypeSchema).array().optional(),
  notIn: z.lazy(() => MagicTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => NestedEnumMagicTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMagicTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMagicTypeFilterSchema).optional()
}).strict();

export const EnumPrimaryAttributeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPrimaryAttributeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PrimaryAttributeSchema).optional(),
  in: z.lazy(() => PrimaryAttributeSchema).array().optional(),
  notIn: z.lazy(() => PrimaryAttributeSchema).array().optional(),
  not: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => NestedEnumPrimaryAttributeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPrimaryAttributeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPrimaryAttributeFilterSchema).optional()
}).strict();

export const PotionCountOrderByAggregateInputSchema: z.ZodType<Prisma.PotionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  primaryAttribute: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PotionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PotionAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PotionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PotionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  primaryAttribute: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PotionMinOrderByAggregateInputSchema: z.ZodType<Prisma.PotionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rarity: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  primaryAttribute: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PotionSumOrderByAggregateInputSchema: z.ZodType<Prisma.PotionSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  abjuration: z.lazy(() => SortOrderSchema).optional(),
  conjuration: z.lazy(() => SortOrderSchema).optional(),
  divination: z.lazy(() => SortOrderSchema).optional(),
  enchantment: z.lazy(() => SortOrderSchema).optional(),
  evocation: z.lazy(() => SortOrderSchema).optional(),
  illusion: z.lazy(() => SortOrderSchema).optional(),
  necromancy: z.lazy(() => SortOrderSchema).optional(),
  transmutation: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleChatMessageCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageCreateNestedManyWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema).array(),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleChatMessageCreateOrConnectWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PuzzleChatMessageCreateManySessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutPuzzleSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutPuzzleSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPuzzleSessionsInputSchema),z.lazy(() => UserCreateWithoutPuzzleSessionsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutPuzzleSessionsInputSchema),z.lazy(() => UserCreateOrConnectWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PuzzleCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleCreateNestedManyWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleCreateWithoutSessionInputSchema),z.lazy(() => PuzzleCreateWithoutSessionInputSchema).array(),z.lazy(() => PuzzleUncheckedCreateWithoutSessionInputSchema),z.lazy(() => PuzzleUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleCreateOrConnectWithoutSessionInputSchema),z.lazy(() => PuzzleCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PuzzleChatMessageUncheckedCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageUncheckedCreateNestedManyWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema).array(),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleChatMessageCreateOrConnectWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PuzzleChatMessageCreateManySessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutPuzzleSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutPuzzleSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPuzzleSessionsInputSchema),z.lazy(() => UserCreateWithoutPuzzleSessionsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutPuzzleSessionsInputSchema),z.lazy(() => UserCreateOrConnectWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PuzzleUncheckedCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleUncheckedCreateNestedManyWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleCreateWithoutSessionInputSchema),z.lazy(() => PuzzleCreateWithoutSessionInputSchema).array(),z.lazy(() => PuzzleUncheckedCreateWithoutSessionInputSchema),z.lazy(() => PuzzleUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleCreateOrConnectWithoutSessionInputSchema),z.lazy(() => PuzzleCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const PuzzleChatMessageUpdateManyWithoutSessionNestedInputSchema: z.ZodType<Prisma.PuzzleChatMessageUpdateManyWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema).array(),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleChatMessageCreateOrConnectWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PuzzleChatMessageUpsertWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUpsertWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PuzzleChatMessageCreateManySessionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PuzzleChatMessageUpdateWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUpdateWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PuzzleChatMessageUpdateManyWithWhereWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUpdateManyWithWhereWithoutSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PuzzleChatMessageScalarWhereInputSchema),z.lazy(() => PuzzleChatMessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutPuzzleSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutPuzzleSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPuzzleSessionsInputSchema),z.lazy(() => UserCreateWithoutPuzzleSessionsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutPuzzleSessionsInputSchema),z.lazy(() => UserCreateOrConnectWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PuzzleUpdateManyWithoutSessionNestedInputSchema: z.ZodType<Prisma.PuzzleUpdateManyWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleCreateWithoutSessionInputSchema),z.lazy(() => PuzzleCreateWithoutSessionInputSchema).array(),z.lazy(() => PuzzleUncheckedCreateWithoutSessionInputSchema),z.lazy(() => PuzzleUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleCreateOrConnectWithoutSessionInputSchema),z.lazy(() => PuzzleCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PuzzleUpsertWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => PuzzleUpsertWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PuzzleUpdateWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => PuzzleUpdateWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PuzzleUpdateManyWithWhereWithoutSessionInputSchema),z.lazy(() => PuzzleUpdateManyWithWhereWithoutSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PuzzleScalarWhereInputSchema),z.lazy(() => PuzzleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PuzzleChatMessageUncheckedUpdateManyWithoutSessionNestedInputSchema: z.ZodType<Prisma.PuzzleChatMessageUncheckedUpdateManyWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema).array(),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleChatMessageCreateOrConnectWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PuzzleChatMessageUpsertWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUpsertWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PuzzleChatMessageCreateManySessionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PuzzleChatMessageUpdateWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUpdateWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PuzzleChatMessageUpdateManyWithWhereWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUpdateManyWithWhereWithoutSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PuzzleChatMessageScalarWhereInputSchema),z.lazy(() => PuzzleChatMessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutPuzzleSessionsNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutPuzzleSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPuzzleSessionsInputSchema),z.lazy(() => UserCreateWithoutPuzzleSessionsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutPuzzleSessionsInputSchema),z.lazy(() => UserCreateOrConnectWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutPuzzleSessionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PuzzleUncheckedUpdateManyWithoutSessionNestedInputSchema: z.ZodType<Prisma.PuzzleUncheckedUpdateManyWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleCreateWithoutSessionInputSchema),z.lazy(() => PuzzleCreateWithoutSessionInputSchema).array(),z.lazy(() => PuzzleUncheckedCreateWithoutSessionInputSchema),z.lazy(() => PuzzleUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleCreateOrConnectWithoutSessionInputSchema),z.lazy(() => PuzzleCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PuzzleUpsertWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => PuzzleUpsertWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PuzzleUpdateWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => PuzzleUpdateWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PuzzleUpdateManyWithWhereWithoutSessionInputSchema),z.lazy(() => PuzzleUpdateManyWithWhereWithoutSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PuzzleScalarWhereInputSchema),z.lazy(() => PuzzleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PuzzleSessionCreateNestedOneWithoutChatInputSchema: z.ZodType<Prisma.PuzzleSessionCreateNestedOneWithoutChatInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutChatInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutChatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PuzzleSessionCreateOrConnectWithoutChatInputSchema).optional(),
  connect: z.lazy(() => PuzzleSessionWhereUniqueInputSchema).optional()
}).strict();

export const PuzzleSessionUpdateOneRequiredWithoutChatNestedInputSchema: z.ZodType<Prisma.PuzzleSessionUpdateOneRequiredWithoutChatNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutChatInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutChatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PuzzleSessionCreateOrConnectWithoutChatInputSchema).optional(),
  upsert: z.lazy(() => PuzzleSessionUpsertWithoutChatInputSchema).optional(),
  connect: z.lazy(() => PuzzleSessionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PuzzleSessionUpdateToOneWithWhereWithoutChatInputSchema),z.lazy(() => PuzzleSessionUpdateWithoutChatInputSchema),z.lazy(() => PuzzleSessionUncheckedUpdateWithoutChatInputSchema) ]).optional(),
}).strict();

export const PuzzleTypeCreateNestedOneWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleTypeCreateNestedOneWithoutPuzzlesInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleTypeCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleTypeUncheckedCreateWithoutPuzzlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PuzzleTypeCreateOrConnectWithoutPuzzlesInputSchema).optional(),
  connect: z.lazy(() => PuzzleTypeWhereUniqueInputSchema).optional()
}).strict();

export const PuzzleSessionCreateNestedManyWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleSessionCreateNestedManyWithoutPuzzlesInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionCreateWithoutPuzzlesInputSchema).array(),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPuzzlesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleSessionCreateOrConnectWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionCreateOrConnectWithoutPuzzlesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PuzzleSessionUncheckedCreateNestedManyWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedCreateNestedManyWithoutPuzzlesInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionCreateWithoutPuzzlesInputSchema).array(),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPuzzlesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleSessionCreateOrConnectWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionCreateOrConnectWithoutPuzzlesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const PuzzleTypeUpdateOneRequiredWithoutPuzzlesNestedInputSchema: z.ZodType<Prisma.PuzzleTypeUpdateOneRequiredWithoutPuzzlesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleTypeCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleTypeUncheckedCreateWithoutPuzzlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PuzzleTypeCreateOrConnectWithoutPuzzlesInputSchema).optional(),
  upsert: z.lazy(() => PuzzleTypeUpsertWithoutPuzzlesInputSchema).optional(),
  connect: z.lazy(() => PuzzleTypeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PuzzleTypeUpdateToOneWithWhereWithoutPuzzlesInputSchema),z.lazy(() => PuzzleTypeUpdateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleTypeUncheckedUpdateWithoutPuzzlesInputSchema) ]).optional(),
}).strict();

export const PuzzleSessionUpdateManyWithoutPuzzlesNestedInputSchema: z.ZodType<Prisma.PuzzleSessionUpdateManyWithoutPuzzlesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionCreateWithoutPuzzlesInputSchema).array(),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPuzzlesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleSessionCreateOrConnectWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionCreateOrConnectWithoutPuzzlesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PuzzleSessionUpsertWithWhereUniqueWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUpsertWithWhereUniqueWithoutPuzzlesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PuzzleSessionUpdateWithWhereUniqueWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUpdateWithWhereUniqueWithoutPuzzlesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PuzzleSessionUpdateManyWithWhereWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUpdateManyWithWhereWithoutPuzzlesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PuzzleSessionScalarWhereInputSchema),z.lazy(() => PuzzleSessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PuzzleSessionUncheckedUpdateManyWithoutPuzzlesNestedInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedUpdateManyWithoutPuzzlesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionCreateWithoutPuzzlesInputSchema).array(),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPuzzlesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleSessionCreateOrConnectWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionCreateOrConnectWithoutPuzzlesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PuzzleSessionUpsertWithWhereUniqueWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUpsertWithWhereUniqueWithoutPuzzlesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PuzzleSessionUpdateWithWhereUniqueWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUpdateWithWhereUniqueWithoutPuzzlesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PuzzleSessionUpdateManyWithWhereWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUpdateManyWithWhereWithoutPuzzlesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PuzzleSessionScalarWhereInputSchema),z.lazy(() => PuzzleSessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PuzzleCreateNestedManyWithoutTypeInputSchema: z.ZodType<Prisma.PuzzleCreateNestedManyWithoutTypeInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleCreateWithoutTypeInputSchema),z.lazy(() => PuzzleCreateWithoutTypeInputSchema).array(),z.lazy(() => PuzzleUncheckedCreateWithoutTypeInputSchema),z.lazy(() => PuzzleUncheckedCreateWithoutTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleCreateOrConnectWithoutTypeInputSchema),z.lazy(() => PuzzleCreateOrConnectWithoutTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PuzzleCreateManyTypeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PuzzleUncheckedCreateNestedManyWithoutTypeInputSchema: z.ZodType<Prisma.PuzzleUncheckedCreateNestedManyWithoutTypeInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleCreateWithoutTypeInputSchema),z.lazy(() => PuzzleCreateWithoutTypeInputSchema).array(),z.lazy(() => PuzzleUncheckedCreateWithoutTypeInputSchema),z.lazy(() => PuzzleUncheckedCreateWithoutTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleCreateOrConnectWithoutTypeInputSchema),z.lazy(() => PuzzleCreateOrConnectWithoutTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PuzzleCreateManyTypeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PuzzleUpdateManyWithoutTypeNestedInputSchema: z.ZodType<Prisma.PuzzleUpdateManyWithoutTypeNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleCreateWithoutTypeInputSchema),z.lazy(() => PuzzleCreateWithoutTypeInputSchema).array(),z.lazy(() => PuzzleUncheckedCreateWithoutTypeInputSchema),z.lazy(() => PuzzleUncheckedCreateWithoutTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleCreateOrConnectWithoutTypeInputSchema),z.lazy(() => PuzzleCreateOrConnectWithoutTypeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PuzzleUpsertWithWhereUniqueWithoutTypeInputSchema),z.lazy(() => PuzzleUpsertWithWhereUniqueWithoutTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PuzzleCreateManyTypeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PuzzleUpdateWithWhereUniqueWithoutTypeInputSchema),z.lazy(() => PuzzleUpdateWithWhereUniqueWithoutTypeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PuzzleUpdateManyWithWhereWithoutTypeInputSchema),z.lazy(() => PuzzleUpdateManyWithWhereWithoutTypeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PuzzleScalarWhereInputSchema),z.lazy(() => PuzzleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PuzzleUncheckedUpdateManyWithoutTypeNestedInputSchema: z.ZodType<Prisma.PuzzleUncheckedUpdateManyWithoutTypeNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleCreateWithoutTypeInputSchema),z.lazy(() => PuzzleCreateWithoutTypeInputSchema).array(),z.lazy(() => PuzzleUncheckedCreateWithoutTypeInputSchema),z.lazy(() => PuzzleUncheckedCreateWithoutTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleCreateOrConnectWithoutTypeInputSchema),z.lazy(() => PuzzleCreateOrConnectWithoutTypeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PuzzleUpsertWithWhereUniqueWithoutTypeInputSchema),z.lazy(() => PuzzleUpsertWithWhereUniqueWithoutTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PuzzleCreateManyTypeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleWhereUniqueInputSchema),z.lazy(() => PuzzleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PuzzleUpdateWithWhereUniqueWithoutTypeInputSchema),z.lazy(() => PuzzleUpdateWithWhereUniqueWithoutTypeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PuzzleUpdateManyWithWhereWithoutTypeInputSchema),z.lazy(() => PuzzleUpdateManyWithWhereWithoutTypeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PuzzleScalarWhereInputSchema),z.lazy(() => PuzzleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PuzzleSessionCreateNestedManyWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleSessionCreateNestedManyWithoutPlayersInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionCreateWithoutPlayersInputSchema).array(),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPlayersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleSessionCreateOrConnectWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionCreateOrConnectWithoutPlayersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IngredientCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.IngredientCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => IngredientCreateWithoutUserInputSchema),z.lazy(() => IngredientCreateWithoutUserInputSchema).array(),z.lazy(() => IngredientUncheckedCreateWithoutUserInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IngredientCreateOrConnectWithoutUserInputSchema),z.lazy(() => IngredientCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IngredientCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PotionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PotionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PotionCreateWithoutUserInputSchema),z.lazy(() => PotionCreateWithoutUserInputSchema).array(),z.lazy(() => PotionUncheckedCreateWithoutUserInputSchema),z.lazy(() => PotionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PotionCreateOrConnectWithoutUserInputSchema),z.lazy(() => PotionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PotionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PotionWhereUniqueInputSchema),z.lazy(() => PotionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FormulaCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FormulaCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FormulaCreateWithoutUserInputSchema),z.lazy(() => FormulaCreateWithoutUserInputSchema).array(),z.lazy(() => FormulaUncheckedCreateWithoutUserInputSchema),z.lazy(() => FormulaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormulaCreateOrConnectWithoutUserInputSchema),z.lazy(() => FormulaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormulaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormulaWhereUniqueInputSchema),z.lazy(() => FormulaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PuzzleSessionUncheckedCreateNestedManyWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedCreateNestedManyWithoutPlayersInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionCreateWithoutPlayersInputSchema).array(),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPlayersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleSessionCreateOrConnectWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionCreateOrConnectWithoutPlayersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IngredientUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.IngredientUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => IngredientCreateWithoutUserInputSchema),z.lazy(() => IngredientCreateWithoutUserInputSchema).array(),z.lazy(() => IngredientUncheckedCreateWithoutUserInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IngredientCreateOrConnectWithoutUserInputSchema),z.lazy(() => IngredientCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IngredientCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PotionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PotionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PotionCreateWithoutUserInputSchema),z.lazy(() => PotionCreateWithoutUserInputSchema).array(),z.lazy(() => PotionUncheckedCreateWithoutUserInputSchema),z.lazy(() => PotionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PotionCreateOrConnectWithoutUserInputSchema),z.lazy(() => PotionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PotionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PotionWhereUniqueInputSchema),z.lazy(() => PotionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FormulaUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FormulaUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FormulaCreateWithoutUserInputSchema),z.lazy(() => FormulaCreateWithoutUserInputSchema).array(),z.lazy(() => FormulaUncheckedCreateWithoutUserInputSchema),z.lazy(() => FormulaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormulaCreateOrConnectWithoutUserInputSchema),z.lazy(() => FormulaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormulaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormulaWhereUniqueInputSchema),z.lazy(() => FormulaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PuzzleSessionUpdateManyWithoutPlayersNestedInputSchema: z.ZodType<Prisma.PuzzleSessionUpdateManyWithoutPlayersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionCreateWithoutPlayersInputSchema).array(),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPlayersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleSessionCreateOrConnectWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionCreateOrConnectWithoutPlayersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PuzzleSessionUpsertWithWhereUniqueWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUpsertWithWhereUniqueWithoutPlayersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PuzzleSessionUpdateWithWhereUniqueWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUpdateWithWhereUniqueWithoutPlayersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PuzzleSessionUpdateManyWithWhereWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUpdateManyWithWhereWithoutPlayersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PuzzleSessionScalarWhereInputSchema),z.lazy(() => PuzzleSessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IngredientUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.IngredientUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => IngredientCreateWithoutUserInputSchema),z.lazy(() => IngredientCreateWithoutUserInputSchema).array(),z.lazy(() => IngredientUncheckedCreateWithoutUserInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IngredientCreateOrConnectWithoutUserInputSchema),z.lazy(() => IngredientCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IngredientUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => IngredientUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IngredientCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IngredientUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => IngredientUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IngredientUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => IngredientUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IngredientScalarWhereInputSchema),z.lazy(() => IngredientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PotionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PotionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PotionCreateWithoutUserInputSchema),z.lazy(() => PotionCreateWithoutUserInputSchema).array(),z.lazy(() => PotionUncheckedCreateWithoutUserInputSchema),z.lazy(() => PotionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PotionCreateOrConnectWithoutUserInputSchema),z.lazy(() => PotionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PotionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PotionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PotionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PotionWhereUniqueInputSchema),z.lazy(() => PotionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PotionWhereUniqueInputSchema),z.lazy(() => PotionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PotionWhereUniqueInputSchema),z.lazy(() => PotionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PotionWhereUniqueInputSchema),z.lazy(() => PotionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PotionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PotionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PotionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PotionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PotionScalarWhereInputSchema),z.lazy(() => PotionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FormulaUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FormulaUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormulaCreateWithoutUserInputSchema),z.lazy(() => FormulaCreateWithoutUserInputSchema).array(),z.lazy(() => FormulaUncheckedCreateWithoutUserInputSchema),z.lazy(() => FormulaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormulaCreateOrConnectWithoutUserInputSchema),z.lazy(() => FormulaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormulaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FormulaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormulaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormulaWhereUniqueInputSchema),z.lazy(() => FormulaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormulaWhereUniqueInputSchema),z.lazy(() => FormulaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormulaWhereUniqueInputSchema),z.lazy(() => FormulaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormulaWhereUniqueInputSchema),z.lazy(() => FormulaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormulaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FormulaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormulaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FormulaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormulaScalarWhereInputSchema),z.lazy(() => FormulaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PuzzleSessionUncheckedUpdateManyWithoutPlayersNestedInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedUpdateManyWithoutPlayersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionCreateWithoutPlayersInputSchema).array(),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPlayersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleSessionCreateOrConnectWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionCreateOrConnectWithoutPlayersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PuzzleSessionUpsertWithWhereUniqueWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUpsertWithWhereUniqueWithoutPlayersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleSessionWhereUniqueInputSchema),z.lazy(() => PuzzleSessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PuzzleSessionUpdateWithWhereUniqueWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUpdateWithWhereUniqueWithoutPlayersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PuzzleSessionUpdateManyWithWhereWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUpdateManyWithWhereWithoutPlayersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PuzzleSessionScalarWhereInputSchema),z.lazy(() => PuzzleSessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IngredientUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.IngredientUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => IngredientCreateWithoutUserInputSchema),z.lazy(() => IngredientCreateWithoutUserInputSchema).array(),z.lazy(() => IngredientUncheckedCreateWithoutUserInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IngredientCreateOrConnectWithoutUserInputSchema),z.lazy(() => IngredientCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IngredientUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => IngredientUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IngredientCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IngredientUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => IngredientUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IngredientUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => IngredientUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IngredientScalarWhereInputSchema),z.lazy(() => IngredientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PotionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PotionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PotionCreateWithoutUserInputSchema),z.lazy(() => PotionCreateWithoutUserInputSchema).array(),z.lazy(() => PotionUncheckedCreateWithoutUserInputSchema),z.lazy(() => PotionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PotionCreateOrConnectWithoutUserInputSchema),z.lazy(() => PotionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PotionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PotionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PotionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PotionWhereUniqueInputSchema),z.lazy(() => PotionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PotionWhereUniqueInputSchema),z.lazy(() => PotionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PotionWhereUniqueInputSchema),z.lazy(() => PotionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PotionWhereUniqueInputSchema),z.lazy(() => PotionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PotionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PotionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PotionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PotionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PotionScalarWhereInputSchema),z.lazy(() => PotionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FormulaUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FormulaUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormulaCreateWithoutUserInputSchema),z.lazy(() => FormulaCreateWithoutUserInputSchema).array(),z.lazy(() => FormulaUncheckedCreateWithoutUserInputSchema),z.lazy(() => FormulaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormulaCreateOrConnectWithoutUserInputSchema),z.lazy(() => FormulaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormulaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FormulaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormulaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormulaWhereUniqueInputSchema),z.lazy(() => FormulaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormulaWhereUniqueInputSchema),z.lazy(() => FormulaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormulaWhereUniqueInputSchema),z.lazy(() => FormulaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormulaWhereUniqueInputSchema),z.lazy(() => FormulaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormulaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FormulaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormulaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FormulaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormulaScalarWhereInputSchema),z.lazy(() => FormulaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FormulaCreateingredientsInputSchema: z.ZodType<Prisma.FormulaCreateingredientsInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreateNestedOneWithoutFormulasInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFormulasInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFormulasInputSchema),z.lazy(() => UserUncheckedCreateWithoutFormulasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFormulasInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumRarityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRarityFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RaritySchema).optional()
}).strict();

export const FormulaUpdateingredientsInputSchema: z.ZodType<Prisma.FormulaUpdateingredientsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutFormulasNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFormulasNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFormulasInputSchema),z.lazy(() => UserUncheckedCreateWithoutFormulasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFormulasInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFormulasInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFormulasInputSchema),z.lazy(() => UserUpdateWithoutFormulasInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFormulasInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutIngredientsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutIngredientsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIngredientsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIngredientsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIngredientsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumMagicTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMagicTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MagicTypeSchema).optional()
}).strict();

export const EnumPrimaryAttributeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPrimaryAttributeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PrimaryAttributeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutIngredientsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutIngredientsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIngredientsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIngredientsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIngredientsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutIngredientsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutIngredientsInputSchema),z.lazy(() => UserUpdateWithoutIngredientsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIngredientsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPotionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPotionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPotionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPotionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPotionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutPotionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPotionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPotionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPotionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPotionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPotionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPotionsInputSchema),z.lazy(() => UserUpdateWithoutPotionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPotionsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedEnumRarityFilterSchema: z.ZodType<Prisma.NestedEnumRarityFilter> = z.object({
  equals: z.lazy(() => RaritySchema).optional(),
  in: z.lazy(() => RaritySchema).array().optional(),
  notIn: z.lazy(() => RaritySchema).array().optional(),
  not: z.union([ z.lazy(() => RaritySchema),z.lazy(() => NestedEnumRarityFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRarityWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRarityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RaritySchema).optional(),
  in: z.lazy(() => RaritySchema).array().optional(),
  notIn: z.lazy(() => RaritySchema).array().optional(),
  not: z.union([ z.lazy(() => RaritySchema),z.lazy(() => NestedEnumRarityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRarityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRarityFilterSchema).optional()
}).strict();

export const NestedEnumMagicTypeFilterSchema: z.ZodType<Prisma.NestedEnumMagicTypeFilter> = z.object({
  equals: z.lazy(() => MagicTypeSchema).optional(),
  in: z.lazy(() => MagicTypeSchema).array().optional(),
  notIn: z.lazy(() => MagicTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => NestedEnumMagicTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPrimaryAttributeFilterSchema: z.ZodType<Prisma.NestedEnumPrimaryAttributeFilter> = z.object({
  equals: z.lazy(() => PrimaryAttributeSchema).optional(),
  in: z.lazy(() => PrimaryAttributeSchema).array().optional(),
  notIn: z.lazy(() => PrimaryAttributeSchema).array().optional(),
  not: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => NestedEnumPrimaryAttributeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumMagicTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMagicTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MagicTypeSchema).optional(),
  in: z.lazy(() => MagicTypeSchema).array().optional(),
  notIn: z.lazy(() => MagicTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => NestedEnumMagicTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMagicTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMagicTypeFilterSchema).optional()
}).strict();

export const NestedEnumPrimaryAttributeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPrimaryAttributeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PrimaryAttributeSchema).optional(),
  in: z.lazy(() => PrimaryAttributeSchema).array().optional(),
  notIn: z.lazy(() => PrimaryAttributeSchema).array().optional(),
  not: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => NestedEnumPrimaryAttributeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPrimaryAttributeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPrimaryAttributeFilterSchema).optional()
}).strict();

export const PuzzleChatMessageCreateWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  message: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageUncheckedCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  message: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PuzzleChatMessageCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageCreateOrConnectWithoutSessionInput> = z.object({
  where: z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const PuzzleChatMessageCreateManySessionInputEnvelopeSchema: z.ZodType<Prisma.PuzzleChatMessageCreateManySessionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PuzzleChatMessageCreateManySessionInputSchema),z.lazy(() => PuzzleChatMessageCreateManySessionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutPuzzleSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutPuzzleSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string(),
  imgUrl: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Ingredients: z.lazy(() => IngredientCreateNestedManyWithoutUserInputSchema).optional(),
  Potions: z.lazy(() => PotionCreateNestedManyWithoutUserInputSchema).optional(),
  Formulas: z.lazy(() => FormulaCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPuzzleSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPuzzleSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string(),
  imgUrl: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Ingredients: z.lazy(() => IngredientUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Potions: z.lazy(() => PotionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Formulas: z.lazy(() => FormulaUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPuzzleSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPuzzleSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPuzzleSessionsInputSchema) ]),
}).strict();

export const PuzzleCreateWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  checkpoint: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  solved: z.boolean(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  type: z.lazy(() => PuzzleTypeCreateNestedOneWithoutPuzzlesInputSchema)
}).strict();

export const PuzzleUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleUncheckedCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  checkpoint: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  solved: z.boolean(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  typeId: z.string()
}).strict();

export const PuzzleCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleCreateOrConnectWithoutSessionInput> = z.object({
  where: z.lazy(() => PuzzleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PuzzleCreateWithoutSessionInputSchema),z.lazy(() => PuzzleUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const PuzzleChatMessageUpsertWithWhereUniqueWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageUpsertWithWhereUniqueWithoutSessionInput> = z.object({
  where: z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PuzzleChatMessageUpdateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUncheckedUpdateWithoutSessionInputSchema) ]),
  create: z.union([ z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const PuzzleChatMessageUpdateWithWhereUniqueWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageUpdateWithWhereUniqueWithoutSessionInput> = z.object({
  where: z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PuzzleChatMessageUpdateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUncheckedUpdateWithoutSessionInputSchema) ]),
}).strict();

export const PuzzleChatMessageUpdateManyWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageUpdateManyWithWhereWithoutSessionInput> = z.object({
  where: z.lazy(() => PuzzleChatMessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PuzzleChatMessageUpdateManyMutationInputSchema),z.lazy(() => PuzzleChatMessageUncheckedUpdateManyWithoutSessionInputSchema) ]),
}).strict();

export const PuzzleChatMessageScalarWhereInputSchema: z.ZodType<Prisma.PuzzleChatMessageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleChatMessageScalarWhereInputSchema),z.lazy(() => PuzzleChatMessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleChatMessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleChatMessageScalarWhereInputSchema),z.lazy(() => PuzzleChatMessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserUpsertWithWhereUniqueWithoutPuzzleSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutPuzzleSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPuzzleSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPuzzleSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutPuzzleSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutPuzzleSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutPuzzleSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPuzzleSessionsInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutPuzzleSessionsInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutPuzzleSessionsInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutPuzzleSessionsInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clerkId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imgUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PuzzleUpsertWithWhereUniqueWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleUpsertWithWhereUniqueWithoutSessionInput> = z.object({
  where: z.lazy(() => PuzzleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PuzzleUpdateWithoutSessionInputSchema),z.lazy(() => PuzzleUncheckedUpdateWithoutSessionInputSchema) ]),
  create: z.union([ z.lazy(() => PuzzleCreateWithoutSessionInputSchema),z.lazy(() => PuzzleUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const PuzzleUpdateWithWhereUniqueWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleUpdateWithWhereUniqueWithoutSessionInput> = z.object({
  where: z.lazy(() => PuzzleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PuzzleUpdateWithoutSessionInputSchema),z.lazy(() => PuzzleUncheckedUpdateWithoutSessionInputSchema) ]),
}).strict();

export const PuzzleUpdateManyWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleUpdateManyWithWhereWithoutSessionInput> = z.object({
  where: z.lazy(() => PuzzleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PuzzleUpdateManyMutationInputSchema),z.lazy(() => PuzzleUncheckedUpdateManyWithoutSessionInputSchema) ]),
}).strict();

export const PuzzleScalarWhereInputSchema: z.ZodType<Prisma.PuzzleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleScalarWhereInputSchema),z.lazy(() => PuzzleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleScalarWhereInputSchema),z.lazy(() => PuzzleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  checkpoint: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  solved: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  data: z.lazy(() => JsonFilterSchema).optional(),
  typeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PuzzleSessionCreateWithoutChatInputSchema: z.ZodType<Prisma.PuzzleSessionCreateWithoutChatInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  durationSeconds: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  players: z.lazy(() => UserCreateNestedManyWithoutPuzzleSessionsInputSchema).optional(),
  puzzles: z.lazy(() => PuzzleCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const PuzzleSessionUncheckedCreateWithoutChatInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedCreateWithoutChatInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  durationSeconds: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  players: z.lazy(() => UserUncheckedCreateNestedManyWithoutPuzzleSessionsInputSchema).optional(),
  puzzles: z.lazy(() => PuzzleUncheckedCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const PuzzleSessionCreateOrConnectWithoutChatInputSchema: z.ZodType<Prisma.PuzzleSessionCreateOrConnectWithoutChatInput> = z.object({
  where: z.lazy(() => PuzzleSessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutChatInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutChatInputSchema) ]),
}).strict();

export const PuzzleSessionUpsertWithoutChatInputSchema: z.ZodType<Prisma.PuzzleSessionUpsertWithoutChatInput> = z.object({
  update: z.union([ z.lazy(() => PuzzleSessionUpdateWithoutChatInputSchema),z.lazy(() => PuzzleSessionUncheckedUpdateWithoutChatInputSchema) ]),
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutChatInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutChatInputSchema) ]),
  where: z.lazy(() => PuzzleSessionWhereInputSchema).optional()
}).strict();

export const PuzzleSessionUpdateToOneWithWhereWithoutChatInputSchema: z.ZodType<Prisma.PuzzleSessionUpdateToOneWithWhereWithoutChatInput> = z.object({
  where: z.lazy(() => PuzzleSessionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PuzzleSessionUpdateWithoutChatInputSchema),z.lazy(() => PuzzleSessionUncheckedUpdateWithoutChatInputSchema) ]),
}).strict();

export const PuzzleSessionUpdateWithoutChatInputSchema: z.ZodType<Prisma.PuzzleSessionUpdateWithoutChatInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => UserUpdateManyWithoutPuzzleSessionsNestedInputSchema).optional(),
  puzzles: z.lazy(() => PuzzleUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const PuzzleSessionUncheckedUpdateWithoutChatInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedUpdateWithoutChatInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => UserUncheckedUpdateManyWithoutPuzzleSessionsNestedInputSchema).optional(),
  puzzles: z.lazy(() => PuzzleUncheckedUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const PuzzleTypeCreateWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleTypeCreateWithoutPuzzlesInput> = z.object({
  name: z.string(),
  id: z.string().cuid().optional()
}).strict();

export const PuzzleTypeUncheckedCreateWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleTypeUncheckedCreateWithoutPuzzlesInput> = z.object({
  name: z.string(),
  id: z.string().cuid().optional()
}).strict();

export const PuzzleTypeCreateOrConnectWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleTypeCreateOrConnectWithoutPuzzlesInput> = z.object({
  where: z.lazy(() => PuzzleTypeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PuzzleTypeCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleTypeUncheckedCreateWithoutPuzzlesInputSchema) ]),
}).strict();

export const PuzzleSessionCreateWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleSessionCreateWithoutPuzzlesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  durationSeconds: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  chat: z.lazy(() => PuzzleChatMessageCreateNestedManyWithoutSessionInputSchema).optional(),
  players: z.lazy(() => UserCreateNestedManyWithoutPuzzleSessionsInputSchema).optional()
}).strict();

export const PuzzleSessionUncheckedCreateWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedCreateWithoutPuzzlesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  durationSeconds: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  chat: z.lazy(() => PuzzleChatMessageUncheckedCreateNestedManyWithoutSessionInputSchema).optional(),
  players: z.lazy(() => UserUncheckedCreateNestedManyWithoutPuzzleSessionsInputSchema).optional()
}).strict();

export const PuzzleSessionCreateOrConnectWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleSessionCreateOrConnectWithoutPuzzlesInput> = z.object({
  where: z.lazy(() => PuzzleSessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPuzzlesInputSchema) ]),
}).strict();

export const PuzzleTypeUpsertWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleTypeUpsertWithoutPuzzlesInput> = z.object({
  update: z.union([ z.lazy(() => PuzzleTypeUpdateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleTypeUncheckedUpdateWithoutPuzzlesInputSchema) ]),
  create: z.union([ z.lazy(() => PuzzleTypeCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleTypeUncheckedCreateWithoutPuzzlesInputSchema) ]),
  where: z.lazy(() => PuzzleTypeWhereInputSchema).optional()
}).strict();

export const PuzzleTypeUpdateToOneWithWhereWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleTypeUpdateToOneWithWhereWithoutPuzzlesInput> = z.object({
  where: z.lazy(() => PuzzleTypeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PuzzleTypeUpdateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleTypeUncheckedUpdateWithoutPuzzlesInputSchema) ]),
}).strict();

export const PuzzleTypeUpdateWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleTypeUpdateWithoutPuzzlesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleTypeUncheckedUpdateWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleTypeUncheckedUpdateWithoutPuzzlesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleSessionUpsertWithWhereUniqueWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleSessionUpsertWithWhereUniqueWithoutPuzzlesInput> = z.object({
  where: z.lazy(() => PuzzleSessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PuzzleSessionUpdateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUncheckedUpdateWithoutPuzzlesInputSchema) ]),
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPuzzlesInputSchema) ]),
}).strict();

export const PuzzleSessionUpdateWithWhereUniqueWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleSessionUpdateWithWhereUniqueWithoutPuzzlesInput> = z.object({
  where: z.lazy(() => PuzzleSessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PuzzleSessionUpdateWithoutPuzzlesInputSchema),z.lazy(() => PuzzleSessionUncheckedUpdateWithoutPuzzlesInputSchema) ]),
}).strict();

export const PuzzleSessionUpdateManyWithWhereWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleSessionUpdateManyWithWhereWithoutPuzzlesInput> = z.object({
  where: z.lazy(() => PuzzleSessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PuzzleSessionUpdateManyMutationInputSchema),z.lazy(() => PuzzleSessionUncheckedUpdateManyWithoutPuzzlesInputSchema) ]),
}).strict();

export const PuzzleSessionScalarWhereInputSchema: z.ZodType<Prisma.PuzzleSessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleSessionScalarWhereInputSchema),z.lazy(() => PuzzleSessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleSessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleSessionScalarWhereInputSchema),z.lazy(() => PuzzleSessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  durationSeconds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PuzzleCreateWithoutTypeInputSchema: z.ZodType<Prisma.PuzzleCreateWithoutTypeInput> = z.object({
  id: z.string().cuid().optional(),
  checkpoint: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  solved: z.boolean(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  session: z.lazy(() => PuzzleSessionCreateNestedManyWithoutPuzzlesInputSchema).optional()
}).strict();

export const PuzzleUncheckedCreateWithoutTypeInputSchema: z.ZodType<Prisma.PuzzleUncheckedCreateWithoutTypeInput> = z.object({
  id: z.string().cuid().optional(),
  checkpoint: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  solved: z.boolean(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  session: z.lazy(() => PuzzleSessionUncheckedCreateNestedManyWithoutPuzzlesInputSchema).optional()
}).strict();

export const PuzzleCreateOrConnectWithoutTypeInputSchema: z.ZodType<Prisma.PuzzleCreateOrConnectWithoutTypeInput> = z.object({
  where: z.lazy(() => PuzzleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PuzzleCreateWithoutTypeInputSchema),z.lazy(() => PuzzleUncheckedCreateWithoutTypeInputSchema) ]),
}).strict();

export const PuzzleCreateManyTypeInputEnvelopeSchema: z.ZodType<Prisma.PuzzleCreateManyTypeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PuzzleCreateManyTypeInputSchema),z.lazy(() => PuzzleCreateManyTypeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PuzzleUpsertWithWhereUniqueWithoutTypeInputSchema: z.ZodType<Prisma.PuzzleUpsertWithWhereUniqueWithoutTypeInput> = z.object({
  where: z.lazy(() => PuzzleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PuzzleUpdateWithoutTypeInputSchema),z.lazy(() => PuzzleUncheckedUpdateWithoutTypeInputSchema) ]),
  create: z.union([ z.lazy(() => PuzzleCreateWithoutTypeInputSchema),z.lazy(() => PuzzleUncheckedCreateWithoutTypeInputSchema) ]),
}).strict();

export const PuzzleUpdateWithWhereUniqueWithoutTypeInputSchema: z.ZodType<Prisma.PuzzleUpdateWithWhereUniqueWithoutTypeInput> = z.object({
  where: z.lazy(() => PuzzleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PuzzleUpdateWithoutTypeInputSchema),z.lazy(() => PuzzleUncheckedUpdateWithoutTypeInputSchema) ]),
}).strict();

export const PuzzleUpdateManyWithWhereWithoutTypeInputSchema: z.ZodType<Prisma.PuzzleUpdateManyWithWhereWithoutTypeInput> = z.object({
  where: z.lazy(() => PuzzleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PuzzleUpdateManyMutationInputSchema),z.lazy(() => PuzzleUncheckedUpdateManyWithoutTypeInputSchema) ]),
}).strict();

export const PuzzleSessionCreateWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleSessionCreateWithoutPlayersInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  durationSeconds: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  chat: z.lazy(() => PuzzleChatMessageCreateNestedManyWithoutSessionInputSchema).optional(),
  puzzles: z.lazy(() => PuzzleCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const PuzzleSessionUncheckedCreateWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedCreateWithoutPlayersInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  durationSeconds: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  chat: z.lazy(() => PuzzleChatMessageUncheckedCreateNestedManyWithoutSessionInputSchema).optional(),
  puzzles: z.lazy(() => PuzzleUncheckedCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const PuzzleSessionCreateOrConnectWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleSessionCreateOrConnectWithoutPlayersInput> = z.object({
  where: z.lazy(() => PuzzleSessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPlayersInputSchema) ]),
}).strict();

export const IngredientCreateWithoutUserInputSchema: z.ZodType<Prisma.IngredientCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  rarity: z.lazy(() => RaritySchema).optional(),
  type: z.lazy(() => MagicTypeSchema).optional(),
  primaryAttribute: z.lazy(() => PrimaryAttributeSchema).optional(),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int().optional(),
  abjuration: z.number().int().optional(),
  conjuration: z.number().int().optional(),
  divination: z.number().int().optional(),
  enchantment: z.number().int().optional(),
  evocation: z.number().int().optional(),
  illusion: z.number().int().optional(),
  necromancy: z.number().int().optional(),
  transmutation: z.number().int().optional()
}).strict();

export const IngredientUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.IngredientUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  rarity: z.lazy(() => RaritySchema).optional(),
  type: z.lazy(() => MagicTypeSchema).optional(),
  primaryAttribute: z.lazy(() => PrimaryAttributeSchema).optional(),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int().optional(),
  abjuration: z.number().int().optional(),
  conjuration: z.number().int().optional(),
  divination: z.number().int().optional(),
  enchantment: z.number().int().optional(),
  evocation: z.number().int().optional(),
  illusion: z.number().int().optional(),
  necromancy: z.number().int().optional(),
  transmutation: z.number().int().optional()
}).strict();

export const IngredientCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.IngredientCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => IngredientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IngredientCreateWithoutUserInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const IngredientCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.IngredientCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IngredientCreateManyUserInputSchema),z.lazy(() => IngredientCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PotionCreateWithoutUserInputSchema: z.ZodType<Prisma.PotionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  rarity: z.lazy(() => RaritySchema).optional(),
  type: z.lazy(() => MagicTypeSchema).optional(),
  primaryAttribute: z.lazy(() => PrimaryAttributeSchema),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int().optional(),
  abjuration: z.number().int().optional(),
  conjuration: z.number().int().optional(),
  divination: z.number().int().optional(),
  enchantment: z.number().int().optional(),
  evocation: z.number().int().optional(),
  illusion: z.number().int().optional(),
  necromancy: z.number().int().optional(),
  transmutation: z.number().int().optional()
}).strict();

export const PotionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PotionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  rarity: z.lazy(() => RaritySchema).optional(),
  type: z.lazy(() => MagicTypeSchema).optional(),
  primaryAttribute: z.lazy(() => PrimaryAttributeSchema),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int().optional(),
  abjuration: z.number().int().optional(),
  conjuration: z.number().int().optional(),
  divination: z.number().int().optional(),
  enchantment: z.number().int().optional(),
  evocation: z.number().int().optional(),
  illusion: z.number().int().optional(),
  necromancy: z.number().int().optional(),
  transmutation: z.number().int().optional()
}).strict();

export const PotionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PotionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PotionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PotionCreateWithoutUserInputSchema),z.lazy(() => PotionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PotionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PotionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PotionCreateManyUserInputSchema),z.lazy(() => PotionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FormulaCreateWithoutUserInputSchema: z.ZodType<Prisma.FormulaCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  rarity: z.lazy(() => RaritySchema).optional(),
  ingredients: z.union([ z.lazy(() => FormulaCreateingredientsInputSchema),z.string().array() ]).optional(),
}).strict();

export const FormulaUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FormulaUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  rarity: z.lazy(() => RaritySchema).optional(),
  ingredients: z.union([ z.lazy(() => FormulaCreateingredientsInputSchema),z.string().array() ]).optional(),
}).strict();

export const FormulaCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FormulaCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FormulaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FormulaCreateWithoutUserInputSchema),z.lazy(() => FormulaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FormulaCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FormulaCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FormulaCreateManyUserInputSchema),z.lazy(() => FormulaCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PuzzleSessionUpsertWithWhereUniqueWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleSessionUpsertWithWhereUniqueWithoutPlayersInput> = z.object({
  where: z.lazy(() => PuzzleSessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PuzzleSessionUpdateWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUncheckedUpdateWithoutPlayersInputSchema) ]),
  create: z.union([ z.lazy(() => PuzzleSessionCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUncheckedCreateWithoutPlayersInputSchema) ]),
}).strict();

export const PuzzleSessionUpdateWithWhereUniqueWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleSessionUpdateWithWhereUniqueWithoutPlayersInput> = z.object({
  where: z.lazy(() => PuzzleSessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PuzzleSessionUpdateWithoutPlayersInputSchema),z.lazy(() => PuzzleSessionUncheckedUpdateWithoutPlayersInputSchema) ]),
}).strict();

export const PuzzleSessionUpdateManyWithWhereWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleSessionUpdateManyWithWhereWithoutPlayersInput> = z.object({
  where: z.lazy(() => PuzzleSessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PuzzleSessionUpdateManyMutationInputSchema),z.lazy(() => PuzzleSessionUncheckedUpdateManyWithoutPlayersInputSchema) ]),
}).strict();

export const IngredientUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.IngredientUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => IngredientWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IngredientUpdateWithoutUserInputSchema),z.lazy(() => IngredientUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => IngredientCreateWithoutUserInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const IngredientUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.IngredientUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => IngredientWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IngredientUpdateWithoutUserInputSchema),z.lazy(() => IngredientUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const IngredientUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.IngredientUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => IngredientScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IngredientUpdateManyMutationInputSchema),z.lazy(() => IngredientUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const IngredientScalarWhereInputSchema: z.ZodType<Prisma.IngredientScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IngredientScalarWhereInputSchema),z.lazy(() => IngredientScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IngredientScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IngredientScalarWhereInputSchema),z.lazy(() => IngredientScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rarity: z.union([ z.lazy(() => EnumRarityFilterSchema),z.lazy(() => RaritySchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumMagicTypeFilterSchema),z.lazy(() => MagicTypeSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => EnumPrimaryAttributeFilterSchema),z.lazy(() => PrimaryAttributeSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  abjuration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  conjuration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  divination: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  enchantment: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  evocation: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  illusion: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  necromancy: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  transmutation: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PotionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PotionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PotionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PotionUpdateWithoutUserInputSchema),z.lazy(() => PotionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PotionCreateWithoutUserInputSchema),z.lazy(() => PotionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PotionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PotionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PotionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PotionUpdateWithoutUserInputSchema),z.lazy(() => PotionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const PotionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PotionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PotionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PotionUpdateManyMutationInputSchema),z.lazy(() => PotionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const PotionScalarWhereInputSchema: z.ZodType<Prisma.PotionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PotionScalarWhereInputSchema),z.lazy(() => PotionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PotionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PotionScalarWhereInputSchema),z.lazy(() => PotionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rarity: z.union([ z.lazy(() => EnumRarityFilterSchema),z.lazy(() => RaritySchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumMagicTypeFilterSchema),z.lazy(() => MagicTypeSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => EnumPrimaryAttributeFilterSchema),z.lazy(() => PrimaryAttributeSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  abjuration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  conjuration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  divination: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  enchantment: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  evocation: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  illusion: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  necromancy: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  transmutation: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const FormulaUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FormulaUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FormulaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FormulaUpdateWithoutUserInputSchema),z.lazy(() => FormulaUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FormulaCreateWithoutUserInputSchema),z.lazy(() => FormulaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FormulaUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FormulaUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FormulaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FormulaUpdateWithoutUserInputSchema),z.lazy(() => FormulaUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const FormulaUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FormulaUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => FormulaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FormulaUpdateManyMutationInputSchema),z.lazy(() => FormulaUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const FormulaScalarWhereInputSchema: z.ZodType<Prisma.FormulaScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FormulaScalarWhereInputSchema),z.lazy(() => FormulaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormulaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormulaScalarWhereInputSchema),z.lazy(() => FormulaScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rarity: z.union([ z.lazy(() => EnumRarityFilterSchema),z.lazy(() => RaritySchema) ]).optional(),
  ingredients: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const UserCreateWithoutFormulasInputSchema: z.ZodType<Prisma.UserCreateWithoutFormulasInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string(),
  imgUrl: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionCreateNestedManyWithoutPlayersInputSchema).optional(),
  Ingredients: z.lazy(() => IngredientCreateNestedManyWithoutUserInputSchema).optional(),
  Potions: z.lazy(() => PotionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFormulasInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFormulasInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string(),
  imgUrl: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionUncheckedCreateNestedManyWithoutPlayersInputSchema).optional(),
  Ingredients: z.lazy(() => IngredientUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Potions: z.lazy(() => PotionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFormulasInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFormulasInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFormulasInputSchema),z.lazy(() => UserUncheckedCreateWithoutFormulasInputSchema) ]),
}).strict();

export const UserUpsertWithoutFormulasInputSchema: z.ZodType<Prisma.UserUpsertWithoutFormulasInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFormulasInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFormulasInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFormulasInputSchema),z.lazy(() => UserUncheckedCreateWithoutFormulasInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFormulasInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFormulasInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFormulasInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFormulasInputSchema) ]),
}).strict();

export const UserUpdateWithoutFormulasInputSchema: z.ZodType<Prisma.UserUpdateWithoutFormulasInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionUpdateManyWithoutPlayersNestedInputSchema).optional(),
  Ingredients: z.lazy(() => IngredientUpdateManyWithoutUserNestedInputSchema).optional(),
  Potions: z.lazy(() => PotionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFormulasInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFormulasInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionUncheckedUpdateManyWithoutPlayersNestedInputSchema).optional(),
  Ingredients: z.lazy(() => IngredientUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Potions: z.lazy(() => PotionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutIngredientsInputSchema: z.ZodType<Prisma.UserCreateWithoutIngredientsInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string(),
  imgUrl: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionCreateNestedManyWithoutPlayersInputSchema).optional(),
  Potions: z.lazy(() => PotionCreateNestedManyWithoutUserInputSchema).optional(),
  Formulas: z.lazy(() => FormulaCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutIngredientsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutIngredientsInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string(),
  imgUrl: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionUncheckedCreateNestedManyWithoutPlayersInputSchema).optional(),
  Potions: z.lazy(() => PotionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Formulas: z.lazy(() => FormulaUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutIngredientsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutIngredientsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutIngredientsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIngredientsInputSchema) ]),
}).strict();

export const UserUpsertWithoutIngredientsInputSchema: z.ZodType<Prisma.UserUpsertWithoutIngredientsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutIngredientsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIngredientsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutIngredientsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIngredientsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutIngredientsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutIngredientsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutIngredientsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIngredientsInputSchema) ]),
}).strict();

export const UserUpdateWithoutIngredientsInputSchema: z.ZodType<Prisma.UserUpdateWithoutIngredientsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionUpdateManyWithoutPlayersNestedInputSchema).optional(),
  Potions: z.lazy(() => PotionUpdateManyWithoutUserNestedInputSchema).optional(),
  Formulas: z.lazy(() => FormulaUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutIngredientsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutIngredientsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionUncheckedUpdateManyWithoutPlayersNestedInputSchema).optional(),
  Potions: z.lazy(() => PotionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Formulas: z.lazy(() => FormulaUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutPotionsInputSchema: z.ZodType<Prisma.UserCreateWithoutPotionsInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string(),
  imgUrl: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionCreateNestedManyWithoutPlayersInputSchema).optional(),
  Ingredients: z.lazy(() => IngredientCreateNestedManyWithoutUserInputSchema).optional(),
  Formulas: z.lazy(() => FormulaCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPotionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPotionsInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string(),
  imgUrl: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionUncheckedCreateNestedManyWithoutPlayersInputSchema).optional(),
  Ingredients: z.lazy(() => IngredientUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Formulas: z.lazy(() => FormulaUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPotionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPotionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPotionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPotionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutPotionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPotionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPotionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPotionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPotionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPotionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPotionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPotionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPotionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPotionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPotionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPotionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionUpdateManyWithoutPlayersNestedInputSchema).optional(),
  Ingredients: z.lazy(() => IngredientUpdateManyWithoutUserNestedInputSchema).optional(),
  Formulas: z.lazy(() => FormulaUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPotionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPotionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  puzzleSessions: z.lazy(() => PuzzleSessionUncheckedUpdateManyWithoutPlayersNestedInputSchema).optional(),
  Ingredients: z.lazy(() => IngredientUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Formulas: z.lazy(() => FormulaUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PuzzleChatMessageCreateManySessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageCreateManySessionInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  message: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PuzzleChatMessageUpdateWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleChatMessageUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageUncheckedUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleChatMessageUncheckedUpdateManyWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageUncheckedUpdateManyWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpdateWithoutPuzzleSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPuzzleSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Ingredients: z.lazy(() => IngredientUpdateManyWithoutUserNestedInputSchema).optional(),
  Potions: z.lazy(() => PotionUpdateManyWithoutUserNestedInputSchema).optional(),
  Formulas: z.lazy(() => FormulaUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPuzzleSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPuzzleSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Ingredients: z.lazy(() => IngredientUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Potions: z.lazy(() => PotionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Formulas: z.lazy(() => FormulaUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutPuzzleSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutPuzzleSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleUpdateWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkpoint: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  solved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  type: z.lazy(() => PuzzleTypeUpdateOneRequiredWithoutPuzzlesNestedInputSchema).optional()
}).strict();

export const PuzzleUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleUncheckedUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkpoint: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  solved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  typeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleUncheckedUpdateManyWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleUncheckedUpdateManyWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkpoint: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  solved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  typeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleSessionUpdateWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleSessionUpdateWithoutPuzzlesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageUpdateManyWithoutSessionNestedInputSchema).optional(),
  players: z.lazy(() => UserUpdateManyWithoutPuzzleSessionsNestedInputSchema).optional()
}).strict();

export const PuzzleSessionUncheckedUpdateWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedUpdateWithoutPuzzlesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageUncheckedUpdateManyWithoutSessionNestedInputSchema).optional(),
  players: z.lazy(() => UserUncheckedUpdateManyWithoutPuzzleSessionsNestedInputSchema).optional()
}).strict();

export const PuzzleSessionUncheckedUpdateManyWithoutPuzzlesInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedUpdateManyWithoutPuzzlesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleCreateManyTypeInputSchema: z.ZodType<Prisma.PuzzleCreateManyTypeInput> = z.object({
  id: z.string().cuid().optional(),
  checkpoint: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  solved: z.boolean(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const PuzzleUpdateWithoutTypeInputSchema: z.ZodType<Prisma.PuzzleUpdateWithoutTypeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkpoint: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  solved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  session: z.lazy(() => PuzzleSessionUpdateManyWithoutPuzzlesNestedInputSchema).optional()
}).strict();

export const PuzzleUncheckedUpdateWithoutTypeInputSchema: z.ZodType<Prisma.PuzzleUncheckedUpdateWithoutTypeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkpoint: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  solved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  session: z.lazy(() => PuzzleSessionUncheckedUpdateManyWithoutPuzzlesNestedInputSchema).optional()
}).strict();

export const PuzzleUncheckedUpdateManyWithoutTypeInputSchema: z.ZodType<Prisma.PuzzleUncheckedUpdateManyWithoutTypeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkpoint: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  solved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const IngredientCreateManyUserInputSchema: z.ZodType<Prisma.IngredientCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  rarity: z.lazy(() => RaritySchema).optional(),
  type: z.lazy(() => MagicTypeSchema).optional(),
  primaryAttribute: z.lazy(() => PrimaryAttributeSchema).optional(),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int().optional(),
  abjuration: z.number().int().optional(),
  conjuration: z.number().int().optional(),
  divination: z.number().int().optional(),
  enchantment: z.number().int().optional(),
  evocation: z.number().int().optional(),
  illusion: z.number().int().optional(),
  necromancy: z.number().int().optional(),
  transmutation: z.number().int().optional()
}).strict();

export const PotionCreateManyUserInputSchema: z.ZodType<Prisma.PotionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  rarity: z.lazy(() => RaritySchema).optional(),
  type: z.lazy(() => MagicTypeSchema).optional(),
  primaryAttribute: z.lazy(() => PrimaryAttributeSchema),
  name: z.string(),
  description: z.string(),
  quantity: z.number().int().optional(),
  abjuration: z.number().int().optional(),
  conjuration: z.number().int().optional(),
  divination: z.number().int().optional(),
  enchantment: z.number().int().optional(),
  evocation: z.number().int().optional(),
  illusion: z.number().int().optional(),
  necromancy: z.number().int().optional(),
  transmutation: z.number().int().optional()
}).strict();

export const FormulaCreateManyUserInputSchema: z.ZodType<Prisma.FormulaCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  rarity: z.lazy(() => RaritySchema).optional(),
  ingredients: z.union([ z.lazy(() => FormulaCreateingredientsInputSchema),z.string().array() ]).optional(),
}).strict();

export const PuzzleSessionUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleSessionUpdateWithoutPlayersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageUpdateManyWithoutSessionNestedInputSchema).optional(),
  puzzles: z.lazy(() => PuzzleUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const PuzzleSessionUncheckedUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedUpdateWithoutPlayersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageUncheckedUpdateManyWithoutSessionNestedInputSchema).optional(),
  puzzles: z.lazy(() => PuzzleUncheckedUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const PuzzleSessionUncheckedUpdateManyWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleSessionUncheckedUpdateManyWithoutPlayersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IngredientUpdateWithoutUserInputSchema: z.ZodType<Prisma.IngredientUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IngredientUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.IngredientUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IngredientUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.IngredientUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PotionUpdateWithoutUserInputSchema: z.ZodType<Prisma.PotionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PotionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PotionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PotionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.PotionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MagicTypeSchema),z.lazy(() => EnumMagicTypeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAttribute: z.union([ z.lazy(() => PrimaryAttributeSchema),z.lazy(() => EnumPrimaryAttributeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  abjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  conjuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  divination: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enchantment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evocation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illusion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  necromancy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transmutation: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormulaUpdateWithoutUserInputSchema: z.ZodType<Prisma.FormulaUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  ingredients: z.union([ z.lazy(() => FormulaUpdateingredientsInputSchema),z.string().array() ]).optional(),
}).strict();

export const FormulaUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FormulaUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  ingredients: z.union([ z.lazy(() => FormulaUpdateingredientsInputSchema),z.string().array() ]).optional(),
}).strict();

export const FormulaUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.FormulaUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rarity: z.union([ z.lazy(() => RaritySchema),z.lazy(() => EnumRarityFieldUpdateOperationsInputSchema) ]).optional(),
  ingredients: z.union([ z.lazy(() => FormulaUpdateingredientsInputSchema),z.string().array() ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const PuzzleSessionFindFirstArgsSchema: z.ZodType<Prisma.PuzzleSessionFindFirstArgs> = z.object({
  select: PuzzleSessionSelectSchema.optional(),
  include: PuzzleSessionIncludeSchema.optional(),
  where: PuzzleSessionWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleSessionOrderByWithRelationInputSchema.array(),PuzzleSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleSessionScalarFieldEnumSchema,PuzzleSessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleSessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PuzzleSessionFindFirstOrThrowArgs> = z.object({
  select: PuzzleSessionSelectSchema.optional(),
  include: PuzzleSessionIncludeSchema.optional(),
  where: PuzzleSessionWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleSessionOrderByWithRelationInputSchema.array(),PuzzleSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleSessionScalarFieldEnumSchema,PuzzleSessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleSessionFindManyArgsSchema: z.ZodType<Prisma.PuzzleSessionFindManyArgs> = z.object({
  select: PuzzleSessionSelectSchema.optional(),
  include: PuzzleSessionIncludeSchema.optional(),
  where: PuzzleSessionWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleSessionOrderByWithRelationInputSchema.array(),PuzzleSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleSessionScalarFieldEnumSchema,PuzzleSessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleSessionAggregateArgsSchema: z.ZodType<Prisma.PuzzleSessionAggregateArgs> = z.object({
  where: PuzzleSessionWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleSessionOrderByWithRelationInputSchema.array(),PuzzleSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PuzzleSessionGroupByArgsSchema: z.ZodType<Prisma.PuzzleSessionGroupByArgs> = z.object({
  where: PuzzleSessionWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleSessionOrderByWithAggregationInputSchema.array(),PuzzleSessionOrderByWithAggregationInputSchema ]).optional(),
  by: PuzzleSessionScalarFieldEnumSchema.array(),
  having: PuzzleSessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PuzzleSessionFindUniqueArgsSchema: z.ZodType<Prisma.PuzzleSessionFindUniqueArgs> = z.object({
  select: PuzzleSessionSelectSchema.optional(),
  include: PuzzleSessionIncludeSchema.optional(),
  where: PuzzleSessionWhereUniqueInputSchema,
}).strict() ;

export const PuzzleSessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PuzzleSessionFindUniqueOrThrowArgs> = z.object({
  select: PuzzleSessionSelectSchema.optional(),
  include: PuzzleSessionIncludeSchema.optional(),
  where: PuzzleSessionWhereUniqueInputSchema,
}).strict() ;

export const PuzzleChatMessageFindFirstArgsSchema: z.ZodType<Prisma.PuzzleChatMessageFindFirstArgs> = z.object({
  select: PuzzleChatMessageSelectSchema.optional(),
  include: PuzzleChatMessageIncludeSchema.optional(),
  where: PuzzleChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleChatMessageOrderByWithRelationInputSchema.array(),PuzzleChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleChatMessageScalarFieldEnumSchema,PuzzleChatMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleChatMessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PuzzleChatMessageFindFirstOrThrowArgs> = z.object({
  select: PuzzleChatMessageSelectSchema.optional(),
  include: PuzzleChatMessageIncludeSchema.optional(),
  where: PuzzleChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleChatMessageOrderByWithRelationInputSchema.array(),PuzzleChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleChatMessageScalarFieldEnumSchema,PuzzleChatMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleChatMessageFindManyArgsSchema: z.ZodType<Prisma.PuzzleChatMessageFindManyArgs> = z.object({
  select: PuzzleChatMessageSelectSchema.optional(),
  include: PuzzleChatMessageIncludeSchema.optional(),
  where: PuzzleChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleChatMessageOrderByWithRelationInputSchema.array(),PuzzleChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleChatMessageScalarFieldEnumSchema,PuzzleChatMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleChatMessageAggregateArgsSchema: z.ZodType<Prisma.PuzzleChatMessageAggregateArgs> = z.object({
  where: PuzzleChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleChatMessageOrderByWithRelationInputSchema.array(),PuzzleChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PuzzleChatMessageGroupByArgsSchema: z.ZodType<Prisma.PuzzleChatMessageGroupByArgs> = z.object({
  where: PuzzleChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleChatMessageOrderByWithAggregationInputSchema.array(),PuzzleChatMessageOrderByWithAggregationInputSchema ]).optional(),
  by: PuzzleChatMessageScalarFieldEnumSchema.array(),
  having: PuzzleChatMessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PuzzleChatMessageFindUniqueArgsSchema: z.ZodType<Prisma.PuzzleChatMessageFindUniqueArgs> = z.object({
  select: PuzzleChatMessageSelectSchema.optional(),
  include: PuzzleChatMessageIncludeSchema.optional(),
  where: PuzzleChatMessageWhereUniqueInputSchema,
}).strict() ;

export const PuzzleChatMessageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PuzzleChatMessageFindUniqueOrThrowArgs> = z.object({
  select: PuzzleChatMessageSelectSchema.optional(),
  include: PuzzleChatMessageIncludeSchema.optional(),
  where: PuzzleChatMessageWhereUniqueInputSchema,
}).strict() ;

export const PuzzleFindFirstArgsSchema: z.ZodType<Prisma.PuzzleFindFirstArgs> = z.object({
  select: PuzzleSelectSchema.optional(),
  include: PuzzleIncludeSchema.optional(),
  where: PuzzleWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleOrderByWithRelationInputSchema.array(),PuzzleOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleScalarFieldEnumSchema,PuzzleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PuzzleFindFirstOrThrowArgs> = z.object({
  select: PuzzleSelectSchema.optional(),
  include: PuzzleIncludeSchema.optional(),
  where: PuzzleWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleOrderByWithRelationInputSchema.array(),PuzzleOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleScalarFieldEnumSchema,PuzzleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleFindManyArgsSchema: z.ZodType<Prisma.PuzzleFindManyArgs> = z.object({
  select: PuzzleSelectSchema.optional(),
  include: PuzzleIncludeSchema.optional(),
  where: PuzzleWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleOrderByWithRelationInputSchema.array(),PuzzleOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleScalarFieldEnumSchema,PuzzleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleAggregateArgsSchema: z.ZodType<Prisma.PuzzleAggregateArgs> = z.object({
  where: PuzzleWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleOrderByWithRelationInputSchema.array(),PuzzleOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PuzzleGroupByArgsSchema: z.ZodType<Prisma.PuzzleGroupByArgs> = z.object({
  where: PuzzleWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleOrderByWithAggregationInputSchema.array(),PuzzleOrderByWithAggregationInputSchema ]).optional(),
  by: PuzzleScalarFieldEnumSchema.array(),
  having: PuzzleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PuzzleFindUniqueArgsSchema: z.ZodType<Prisma.PuzzleFindUniqueArgs> = z.object({
  select: PuzzleSelectSchema.optional(),
  include: PuzzleIncludeSchema.optional(),
  where: PuzzleWhereUniqueInputSchema,
}).strict() ;

export const PuzzleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PuzzleFindUniqueOrThrowArgs> = z.object({
  select: PuzzleSelectSchema.optional(),
  include: PuzzleIncludeSchema.optional(),
  where: PuzzleWhereUniqueInputSchema,
}).strict() ;

export const PuzzleTypeFindFirstArgsSchema: z.ZodType<Prisma.PuzzleTypeFindFirstArgs> = z.object({
  select: PuzzleTypeSelectSchema.optional(),
  include: PuzzleTypeIncludeSchema.optional(),
  where: PuzzleTypeWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleTypeOrderByWithRelationInputSchema.array(),PuzzleTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleTypeScalarFieldEnumSchema,PuzzleTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleTypeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PuzzleTypeFindFirstOrThrowArgs> = z.object({
  select: PuzzleTypeSelectSchema.optional(),
  include: PuzzleTypeIncludeSchema.optional(),
  where: PuzzleTypeWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleTypeOrderByWithRelationInputSchema.array(),PuzzleTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleTypeScalarFieldEnumSchema,PuzzleTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleTypeFindManyArgsSchema: z.ZodType<Prisma.PuzzleTypeFindManyArgs> = z.object({
  select: PuzzleTypeSelectSchema.optional(),
  include: PuzzleTypeIncludeSchema.optional(),
  where: PuzzleTypeWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleTypeOrderByWithRelationInputSchema.array(),PuzzleTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleTypeScalarFieldEnumSchema,PuzzleTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleTypeAggregateArgsSchema: z.ZodType<Prisma.PuzzleTypeAggregateArgs> = z.object({
  where: PuzzleTypeWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleTypeOrderByWithRelationInputSchema.array(),PuzzleTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PuzzleTypeGroupByArgsSchema: z.ZodType<Prisma.PuzzleTypeGroupByArgs> = z.object({
  where: PuzzleTypeWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleTypeOrderByWithAggregationInputSchema.array(),PuzzleTypeOrderByWithAggregationInputSchema ]).optional(),
  by: PuzzleTypeScalarFieldEnumSchema.array(),
  having: PuzzleTypeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PuzzleTypeFindUniqueArgsSchema: z.ZodType<Prisma.PuzzleTypeFindUniqueArgs> = z.object({
  select: PuzzleTypeSelectSchema.optional(),
  include: PuzzleTypeIncludeSchema.optional(),
  where: PuzzleTypeWhereUniqueInputSchema,
}).strict() ;

export const PuzzleTypeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PuzzleTypeFindUniqueOrThrowArgs> = z.object({
  select: PuzzleTypeSelectSchema.optional(),
  include: PuzzleTypeIncludeSchema.optional(),
  where: PuzzleTypeWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const FormulaFindFirstArgsSchema: z.ZodType<Prisma.FormulaFindFirstArgs> = z.object({
  select: FormulaSelectSchema.optional(),
  include: FormulaIncludeSchema.optional(),
  where: FormulaWhereInputSchema.optional(),
  orderBy: z.union([ FormulaOrderByWithRelationInputSchema.array(),FormulaOrderByWithRelationInputSchema ]).optional(),
  cursor: FormulaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormulaScalarFieldEnumSchema,FormulaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormulaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FormulaFindFirstOrThrowArgs> = z.object({
  select: FormulaSelectSchema.optional(),
  include: FormulaIncludeSchema.optional(),
  where: FormulaWhereInputSchema.optional(),
  orderBy: z.union([ FormulaOrderByWithRelationInputSchema.array(),FormulaOrderByWithRelationInputSchema ]).optional(),
  cursor: FormulaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormulaScalarFieldEnumSchema,FormulaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormulaFindManyArgsSchema: z.ZodType<Prisma.FormulaFindManyArgs> = z.object({
  select: FormulaSelectSchema.optional(),
  include: FormulaIncludeSchema.optional(),
  where: FormulaWhereInputSchema.optional(),
  orderBy: z.union([ FormulaOrderByWithRelationInputSchema.array(),FormulaOrderByWithRelationInputSchema ]).optional(),
  cursor: FormulaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormulaScalarFieldEnumSchema,FormulaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormulaAggregateArgsSchema: z.ZodType<Prisma.FormulaAggregateArgs> = z.object({
  where: FormulaWhereInputSchema.optional(),
  orderBy: z.union([ FormulaOrderByWithRelationInputSchema.array(),FormulaOrderByWithRelationInputSchema ]).optional(),
  cursor: FormulaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FormulaGroupByArgsSchema: z.ZodType<Prisma.FormulaGroupByArgs> = z.object({
  where: FormulaWhereInputSchema.optional(),
  orderBy: z.union([ FormulaOrderByWithAggregationInputSchema.array(),FormulaOrderByWithAggregationInputSchema ]).optional(),
  by: FormulaScalarFieldEnumSchema.array(),
  having: FormulaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FormulaFindUniqueArgsSchema: z.ZodType<Prisma.FormulaFindUniqueArgs> = z.object({
  select: FormulaSelectSchema.optional(),
  include: FormulaIncludeSchema.optional(),
  where: FormulaWhereUniqueInputSchema,
}).strict() ;

export const FormulaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FormulaFindUniqueOrThrowArgs> = z.object({
  select: FormulaSelectSchema.optional(),
  include: FormulaIncludeSchema.optional(),
  where: FormulaWhereUniqueInputSchema,
}).strict() ;

export const IngredientFindFirstArgsSchema: z.ZodType<Prisma.IngredientFindFirstArgs> = z.object({
  select: IngredientSelectSchema.optional(),
  include: IngredientIncludeSchema.optional(),
  where: IngredientWhereInputSchema.optional(),
  orderBy: z.union([ IngredientOrderByWithRelationInputSchema.array(),IngredientOrderByWithRelationInputSchema ]).optional(),
  cursor: IngredientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IngredientScalarFieldEnumSchema,IngredientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IngredientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IngredientFindFirstOrThrowArgs> = z.object({
  select: IngredientSelectSchema.optional(),
  include: IngredientIncludeSchema.optional(),
  where: IngredientWhereInputSchema.optional(),
  orderBy: z.union([ IngredientOrderByWithRelationInputSchema.array(),IngredientOrderByWithRelationInputSchema ]).optional(),
  cursor: IngredientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IngredientScalarFieldEnumSchema,IngredientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IngredientFindManyArgsSchema: z.ZodType<Prisma.IngredientFindManyArgs> = z.object({
  select: IngredientSelectSchema.optional(),
  include: IngredientIncludeSchema.optional(),
  where: IngredientWhereInputSchema.optional(),
  orderBy: z.union([ IngredientOrderByWithRelationInputSchema.array(),IngredientOrderByWithRelationInputSchema ]).optional(),
  cursor: IngredientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IngredientScalarFieldEnumSchema,IngredientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IngredientAggregateArgsSchema: z.ZodType<Prisma.IngredientAggregateArgs> = z.object({
  where: IngredientWhereInputSchema.optional(),
  orderBy: z.union([ IngredientOrderByWithRelationInputSchema.array(),IngredientOrderByWithRelationInputSchema ]).optional(),
  cursor: IngredientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const IngredientGroupByArgsSchema: z.ZodType<Prisma.IngredientGroupByArgs> = z.object({
  where: IngredientWhereInputSchema.optional(),
  orderBy: z.union([ IngredientOrderByWithAggregationInputSchema.array(),IngredientOrderByWithAggregationInputSchema ]).optional(),
  by: IngredientScalarFieldEnumSchema.array(),
  having: IngredientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const IngredientFindUniqueArgsSchema: z.ZodType<Prisma.IngredientFindUniqueArgs> = z.object({
  select: IngredientSelectSchema.optional(),
  include: IngredientIncludeSchema.optional(),
  where: IngredientWhereUniqueInputSchema,
}).strict() ;

export const IngredientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IngredientFindUniqueOrThrowArgs> = z.object({
  select: IngredientSelectSchema.optional(),
  include: IngredientIncludeSchema.optional(),
  where: IngredientWhereUniqueInputSchema,
}).strict() ;

export const PotionFindFirstArgsSchema: z.ZodType<Prisma.PotionFindFirstArgs> = z.object({
  select: PotionSelectSchema.optional(),
  include: PotionIncludeSchema.optional(),
  where: PotionWhereInputSchema.optional(),
  orderBy: z.union([ PotionOrderByWithRelationInputSchema.array(),PotionOrderByWithRelationInputSchema ]).optional(),
  cursor: PotionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PotionScalarFieldEnumSchema,PotionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PotionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PotionFindFirstOrThrowArgs> = z.object({
  select: PotionSelectSchema.optional(),
  include: PotionIncludeSchema.optional(),
  where: PotionWhereInputSchema.optional(),
  orderBy: z.union([ PotionOrderByWithRelationInputSchema.array(),PotionOrderByWithRelationInputSchema ]).optional(),
  cursor: PotionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PotionScalarFieldEnumSchema,PotionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PotionFindManyArgsSchema: z.ZodType<Prisma.PotionFindManyArgs> = z.object({
  select: PotionSelectSchema.optional(),
  include: PotionIncludeSchema.optional(),
  where: PotionWhereInputSchema.optional(),
  orderBy: z.union([ PotionOrderByWithRelationInputSchema.array(),PotionOrderByWithRelationInputSchema ]).optional(),
  cursor: PotionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PotionScalarFieldEnumSchema,PotionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PotionAggregateArgsSchema: z.ZodType<Prisma.PotionAggregateArgs> = z.object({
  where: PotionWhereInputSchema.optional(),
  orderBy: z.union([ PotionOrderByWithRelationInputSchema.array(),PotionOrderByWithRelationInputSchema ]).optional(),
  cursor: PotionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PotionGroupByArgsSchema: z.ZodType<Prisma.PotionGroupByArgs> = z.object({
  where: PotionWhereInputSchema.optional(),
  orderBy: z.union([ PotionOrderByWithAggregationInputSchema.array(),PotionOrderByWithAggregationInputSchema ]).optional(),
  by: PotionScalarFieldEnumSchema.array(),
  having: PotionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PotionFindUniqueArgsSchema: z.ZodType<Prisma.PotionFindUniqueArgs> = z.object({
  select: PotionSelectSchema.optional(),
  include: PotionIncludeSchema.optional(),
  where: PotionWhereUniqueInputSchema,
}).strict() ;

export const PotionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PotionFindUniqueOrThrowArgs> = z.object({
  select: PotionSelectSchema.optional(),
  include: PotionIncludeSchema.optional(),
  where: PotionWhereUniqueInputSchema,
}).strict() ;

export const PuzzleSessionCreateArgsSchema: z.ZodType<Prisma.PuzzleSessionCreateArgs> = z.object({
  select: PuzzleSessionSelectSchema.optional(),
  include: PuzzleSessionIncludeSchema.optional(),
  data: z.union([ PuzzleSessionCreateInputSchema,PuzzleSessionUncheckedCreateInputSchema ]),
}).strict() ;

export const PuzzleSessionUpsertArgsSchema: z.ZodType<Prisma.PuzzleSessionUpsertArgs> = z.object({
  select: PuzzleSessionSelectSchema.optional(),
  include: PuzzleSessionIncludeSchema.optional(),
  where: PuzzleSessionWhereUniqueInputSchema,
  create: z.union([ PuzzleSessionCreateInputSchema,PuzzleSessionUncheckedCreateInputSchema ]),
  update: z.union([ PuzzleSessionUpdateInputSchema,PuzzleSessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const PuzzleSessionCreateManyArgsSchema: z.ZodType<Prisma.PuzzleSessionCreateManyArgs> = z.object({
  data: z.union([ PuzzleSessionCreateManyInputSchema,PuzzleSessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PuzzleSessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PuzzleSessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ PuzzleSessionCreateManyInputSchema,PuzzleSessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PuzzleSessionDeleteArgsSchema: z.ZodType<Prisma.PuzzleSessionDeleteArgs> = z.object({
  select: PuzzleSessionSelectSchema.optional(),
  include: PuzzleSessionIncludeSchema.optional(),
  where: PuzzleSessionWhereUniqueInputSchema,
}).strict() ;

export const PuzzleSessionUpdateArgsSchema: z.ZodType<Prisma.PuzzleSessionUpdateArgs> = z.object({
  select: PuzzleSessionSelectSchema.optional(),
  include: PuzzleSessionIncludeSchema.optional(),
  data: z.union([ PuzzleSessionUpdateInputSchema,PuzzleSessionUncheckedUpdateInputSchema ]),
  where: PuzzleSessionWhereUniqueInputSchema,
}).strict() ;

export const PuzzleSessionUpdateManyArgsSchema: z.ZodType<Prisma.PuzzleSessionUpdateManyArgs> = z.object({
  data: z.union([ PuzzleSessionUpdateManyMutationInputSchema,PuzzleSessionUncheckedUpdateManyInputSchema ]),
  where: PuzzleSessionWhereInputSchema.optional(),
}).strict() ;

export const PuzzleSessionDeleteManyArgsSchema: z.ZodType<Prisma.PuzzleSessionDeleteManyArgs> = z.object({
  where: PuzzleSessionWhereInputSchema.optional(),
}).strict() ;

export const PuzzleChatMessageCreateArgsSchema: z.ZodType<Prisma.PuzzleChatMessageCreateArgs> = z.object({
  select: PuzzleChatMessageSelectSchema.optional(),
  include: PuzzleChatMessageIncludeSchema.optional(),
  data: z.union([ PuzzleChatMessageCreateInputSchema,PuzzleChatMessageUncheckedCreateInputSchema ]),
}).strict() ;

export const PuzzleChatMessageUpsertArgsSchema: z.ZodType<Prisma.PuzzleChatMessageUpsertArgs> = z.object({
  select: PuzzleChatMessageSelectSchema.optional(),
  include: PuzzleChatMessageIncludeSchema.optional(),
  where: PuzzleChatMessageWhereUniqueInputSchema,
  create: z.union([ PuzzleChatMessageCreateInputSchema,PuzzleChatMessageUncheckedCreateInputSchema ]),
  update: z.union([ PuzzleChatMessageUpdateInputSchema,PuzzleChatMessageUncheckedUpdateInputSchema ]),
}).strict() ;

export const PuzzleChatMessageCreateManyArgsSchema: z.ZodType<Prisma.PuzzleChatMessageCreateManyArgs> = z.object({
  data: z.union([ PuzzleChatMessageCreateManyInputSchema,PuzzleChatMessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PuzzleChatMessageCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PuzzleChatMessageCreateManyAndReturnArgs> = z.object({
  data: z.union([ PuzzleChatMessageCreateManyInputSchema,PuzzleChatMessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PuzzleChatMessageDeleteArgsSchema: z.ZodType<Prisma.PuzzleChatMessageDeleteArgs> = z.object({
  select: PuzzleChatMessageSelectSchema.optional(),
  include: PuzzleChatMessageIncludeSchema.optional(),
  where: PuzzleChatMessageWhereUniqueInputSchema,
}).strict() ;

export const PuzzleChatMessageUpdateArgsSchema: z.ZodType<Prisma.PuzzleChatMessageUpdateArgs> = z.object({
  select: PuzzleChatMessageSelectSchema.optional(),
  include: PuzzleChatMessageIncludeSchema.optional(),
  data: z.union([ PuzzleChatMessageUpdateInputSchema,PuzzleChatMessageUncheckedUpdateInputSchema ]),
  where: PuzzleChatMessageWhereUniqueInputSchema,
}).strict() ;

export const PuzzleChatMessageUpdateManyArgsSchema: z.ZodType<Prisma.PuzzleChatMessageUpdateManyArgs> = z.object({
  data: z.union([ PuzzleChatMessageUpdateManyMutationInputSchema,PuzzleChatMessageUncheckedUpdateManyInputSchema ]),
  where: PuzzleChatMessageWhereInputSchema.optional(),
}).strict() ;

export const PuzzleChatMessageDeleteManyArgsSchema: z.ZodType<Prisma.PuzzleChatMessageDeleteManyArgs> = z.object({
  where: PuzzleChatMessageWhereInputSchema.optional(),
}).strict() ;

export const PuzzleCreateArgsSchema: z.ZodType<Prisma.PuzzleCreateArgs> = z.object({
  select: PuzzleSelectSchema.optional(),
  include: PuzzleIncludeSchema.optional(),
  data: z.union([ PuzzleCreateInputSchema,PuzzleUncheckedCreateInputSchema ]),
}).strict() ;

export const PuzzleUpsertArgsSchema: z.ZodType<Prisma.PuzzleUpsertArgs> = z.object({
  select: PuzzleSelectSchema.optional(),
  include: PuzzleIncludeSchema.optional(),
  where: PuzzleWhereUniqueInputSchema,
  create: z.union([ PuzzleCreateInputSchema,PuzzleUncheckedCreateInputSchema ]),
  update: z.union([ PuzzleUpdateInputSchema,PuzzleUncheckedUpdateInputSchema ]),
}).strict() ;

export const PuzzleCreateManyArgsSchema: z.ZodType<Prisma.PuzzleCreateManyArgs> = z.object({
  data: z.union([ PuzzleCreateManyInputSchema,PuzzleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PuzzleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PuzzleCreateManyAndReturnArgs> = z.object({
  data: z.union([ PuzzleCreateManyInputSchema,PuzzleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PuzzleDeleteArgsSchema: z.ZodType<Prisma.PuzzleDeleteArgs> = z.object({
  select: PuzzleSelectSchema.optional(),
  include: PuzzleIncludeSchema.optional(),
  where: PuzzleWhereUniqueInputSchema,
}).strict() ;

export const PuzzleUpdateArgsSchema: z.ZodType<Prisma.PuzzleUpdateArgs> = z.object({
  select: PuzzleSelectSchema.optional(),
  include: PuzzleIncludeSchema.optional(),
  data: z.union([ PuzzleUpdateInputSchema,PuzzleUncheckedUpdateInputSchema ]),
  where: PuzzleWhereUniqueInputSchema,
}).strict() ;

export const PuzzleUpdateManyArgsSchema: z.ZodType<Prisma.PuzzleUpdateManyArgs> = z.object({
  data: z.union([ PuzzleUpdateManyMutationInputSchema,PuzzleUncheckedUpdateManyInputSchema ]),
  where: PuzzleWhereInputSchema.optional(),
}).strict() ;

export const PuzzleDeleteManyArgsSchema: z.ZodType<Prisma.PuzzleDeleteManyArgs> = z.object({
  where: PuzzleWhereInputSchema.optional(),
}).strict() ;

export const PuzzleTypeCreateArgsSchema: z.ZodType<Prisma.PuzzleTypeCreateArgs> = z.object({
  select: PuzzleTypeSelectSchema.optional(),
  include: PuzzleTypeIncludeSchema.optional(),
  data: z.union([ PuzzleTypeCreateInputSchema,PuzzleTypeUncheckedCreateInputSchema ]),
}).strict() ;

export const PuzzleTypeUpsertArgsSchema: z.ZodType<Prisma.PuzzleTypeUpsertArgs> = z.object({
  select: PuzzleTypeSelectSchema.optional(),
  include: PuzzleTypeIncludeSchema.optional(),
  where: PuzzleTypeWhereUniqueInputSchema,
  create: z.union([ PuzzleTypeCreateInputSchema,PuzzleTypeUncheckedCreateInputSchema ]),
  update: z.union([ PuzzleTypeUpdateInputSchema,PuzzleTypeUncheckedUpdateInputSchema ]),
}).strict() ;

export const PuzzleTypeCreateManyArgsSchema: z.ZodType<Prisma.PuzzleTypeCreateManyArgs> = z.object({
  data: z.union([ PuzzleTypeCreateManyInputSchema,PuzzleTypeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PuzzleTypeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PuzzleTypeCreateManyAndReturnArgs> = z.object({
  data: z.union([ PuzzleTypeCreateManyInputSchema,PuzzleTypeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PuzzleTypeDeleteArgsSchema: z.ZodType<Prisma.PuzzleTypeDeleteArgs> = z.object({
  select: PuzzleTypeSelectSchema.optional(),
  include: PuzzleTypeIncludeSchema.optional(),
  where: PuzzleTypeWhereUniqueInputSchema,
}).strict() ;

export const PuzzleTypeUpdateArgsSchema: z.ZodType<Prisma.PuzzleTypeUpdateArgs> = z.object({
  select: PuzzleTypeSelectSchema.optional(),
  include: PuzzleTypeIncludeSchema.optional(),
  data: z.union([ PuzzleTypeUpdateInputSchema,PuzzleTypeUncheckedUpdateInputSchema ]),
  where: PuzzleTypeWhereUniqueInputSchema,
}).strict() ;

export const PuzzleTypeUpdateManyArgsSchema: z.ZodType<Prisma.PuzzleTypeUpdateManyArgs> = z.object({
  data: z.union([ PuzzleTypeUpdateManyMutationInputSchema,PuzzleTypeUncheckedUpdateManyInputSchema ]),
  where: PuzzleTypeWhereInputSchema.optional(),
}).strict() ;

export const PuzzleTypeDeleteManyArgsSchema: z.ZodType<Prisma.PuzzleTypeDeleteManyArgs> = z.object({
  where: PuzzleTypeWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const FormulaCreateArgsSchema: z.ZodType<Prisma.FormulaCreateArgs> = z.object({
  select: FormulaSelectSchema.optional(),
  include: FormulaIncludeSchema.optional(),
  data: z.union([ FormulaCreateInputSchema,FormulaUncheckedCreateInputSchema ]),
}).strict() ;

export const FormulaUpsertArgsSchema: z.ZodType<Prisma.FormulaUpsertArgs> = z.object({
  select: FormulaSelectSchema.optional(),
  include: FormulaIncludeSchema.optional(),
  where: FormulaWhereUniqueInputSchema,
  create: z.union([ FormulaCreateInputSchema,FormulaUncheckedCreateInputSchema ]),
  update: z.union([ FormulaUpdateInputSchema,FormulaUncheckedUpdateInputSchema ]),
}).strict() ;

export const FormulaCreateManyArgsSchema: z.ZodType<Prisma.FormulaCreateManyArgs> = z.object({
  data: z.union([ FormulaCreateManyInputSchema,FormulaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FormulaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FormulaCreateManyAndReturnArgs> = z.object({
  data: z.union([ FormulaCreateManyInputSchema,FormulaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FormulaDeleteArgsSchema: z.ZodType<Prisma.FormulaDeleteArgs> = z.object({
  select: FormulaSelectSchema.optional(),
  include: FormulaIncludeSchema.optional(),
  where: FormulaWhereUniqueInputSchema,
}).strict() ;

export const FormulaUpdateArgsSchema: z.ZodType<Prisma.FormulaUpdateArgs> = z.object({
  select: FormulaSelectSchema.optional(),
  include: FormulaIncludeSchema.optional(),
  data: z.union([ FormulaUpdateInputSchema,FormulaUncheckedUpdateInputSchema ]),
  where: FormulaWhereUniqueInputSchema,
}).strict() ;

export const FormulaUpdateManyArgsSchema: z.ZodType<Prisma.FormulaUpdateManyArgs> = z.object({
  data: z.union([ FormulaUpdateManyMutationInputSchema,FormulaUncheckedUpdateManyInputSchema ]),
  where: FormulaWhereInputSchema.optional(),
}).strict() ;

export const FormulaDeleteManyArgsSchema: z.ZodType<Prisma.FormulaDeleteManyArgs> = z.object({
  where: FormulaWhereInputSchema.optional(),
}).strict() ;

export const IngredientCreateArgsSchema: z.ZodType<Prisma.IngredientCreateArgs> = z.object({
  select: IngredientSelectSchema.optional(),
  include: IngredientIncludeSchema.optional(),
  data: z.union([ IngredientCreateInputSchema,IngredientUncheckedCreateInputSchema ]),
}).strict() ;

export const IngredientUpsertArgsSchema: z.ZodType<Prisma.IngredientUpsertArgs> = z.object({
  select: IngredientSelectSchema.optional(),
  include: IngredientIncludeSchema.optional(),
  where: IngredientWhereUniqueInputSchema,
  create: z.union([ IngredientCreateInputSchema,IngredientUncheckedCreateInputSchema ]),
  update: z.union([ IngredientUpdateInputSchema,IngredientUncheckedUpdateInputSchema ]),
}).strict() ;

export const IngredientCreateManyArgsSchema: z.ZodType<Prisma.IngredientCreateManyArgs> = z.object({
  data: z.union([ IngredientCreateManyInputSchema,IngredientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const IngredientCreateManyAndReturnArgsSchema: z.ZodType<Prisma.IngredientCreateManyAndReturnArgs> = z.object({
  data: z.union([ IngredientCreateManyInputSchema,IngredientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const IngredientDeleteArgsSchema: z.ZodType<Prisma.IngredientDeleteArgs> = z.object({
  select: IngredientSelectSchema.optional(),
  include: IngredientIncludeSchema.optional(),
  where: IngredientWhereUniqueInputSchema,
}).strict() ;

export const IngredientUpdateArgsSchema: z.ZodType<Prisma.IngredientUpdateArgs> = z.object({
  select: IngredientSelectSchema.optional(),
  include: IngredientIncludeSchema.optional(),
  data: z.union([ IngredientUpdateInputSchema,IngredientUncheckedUpdateInputSchema ]),
  where: IngredientWhereUniqueInputSchema,
}).strict() ;

export const IngredientUpdateManyArgsSchema: z.ZodType<Prisma.IngredientUpdateManyArgs> = z.object({
  data: z.union([ IngredientUpdateManyMutationInputSchema,IngredientUncheckedUpdateManyInputSchema ]),
  where: IngredientWhereInputSchema.optional(),
}).strict() ;

export const IngredientDeleteManyArgsSchema: z.ZodType<Prisma.IngredientDeleteManyArgs> = z.object({
  where: IngredientWhereInputSchema.optional(),
}).strict() ;

export const PotionCreateArgsSchema: z.ZodType<Prisma.PotionCreateArgs> = z.object({
  select: PotionSelectSchema.optional(),
  include: PotionIncludeSchema.optional(),
  data: z.union([ PotionCreateInputSchema,PotionUncheckedCreateInputSchema ]),
}).strict() ;

export const PotionUpsertArgsSchema: z.ZodType<Prisma.PotionUpsertArgs> = z.object({
  select: PotionSelectSchema.optional(),
  include: PotionIncludeSchema.optional(),
  where: PotionWhereUniqueInputSchema,
  create: z.union([ PotionCreateInputSchema,PotionUncheckedCreateInputSchema ]),
  update: z.union([ PotionUpdateInputSchema,PotionUncheckedUpdateInputSchema ]),
}).strict() ;

export const PotionCreateManyArgsSchema: z.ZodType<Prisma.PotionCreateManyArgs> = z.object({
  data: z.union([ PotionCreateManyInputSchema,PotionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PotionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PotionCreateManyAndReturnArgs> = z.object({
  data: z.union([ PotionCreateManyInputSchema,PotionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PotionDeleteArgsSchema: z.ZodType<Prisma.PotionDeleteArgs> = z.object({
  select: PotionSelectSchema.optional(),
  include: PotionIncludeSchema.optional(),
  where: PotionWhereUniqueInputSchema,
}).strict() ;

export const PotionUpdateArgsSchema: z.ZodType<Prisma.PotionUpdateArgs> = z.object({
  select: PotionSelectSchema.optional(),
  include: PotionIncludeSchema.optional(),
  data: z.union([ PotionUpdateInputSchema,PotionUncheckedUpdateInputSchema ]),
  where: PotionWhereUniqueInputSchema,
}).strict() ;

export const PotionUpdateManyArgsSchema: z.ZodType<Prisma.PotionUpdateManyArgs> = z.object({
  data: z.union([ PotionUpdateManyMutationInputSchema,PotionUncheckedUpdateManyInputSchema ]),
  where: PotionWhereInputSchema.optional(),
}).strict() ;

export const PotionDeleteManyArgsSchema: z.ZodType<Prisma.PotionDeleteManyArgs> = z.object({
  where: PotionWhereInputSchema.optional(),
}).strict() ;