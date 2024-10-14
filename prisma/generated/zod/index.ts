import { z } from 'zod';
import { Prisma } from '@prisma/client';
import type { Prisma } from '@prisma/client';

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

export const PuzzleElementalTrialsScalarFieldEnumSchema = z.enum(['id','title','createdAt','updatedAt','firegem','airgem','earthgem','watergem']);

export const PuzzleChatMessageScalarFieldEnumSchema = z.enum(['id','sessionId','username','message','createdAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','clerkId','imgUrl','username','email','createdAt','updatedAt']);

export const FormulaScalarFieldEnumSchema = z.enum(['id','userId','name','description','rarity','ingredients']);

export const IngredientScalarFieldEnumSchema = z.enum(['id','rarity','type','primaryAttribute','name','description','quantity','abjuration','conjuration','divination','enchantment','evocation','illusion','necromancy','transmutation','userId']);

export const PotionScalarFieldEnumSchema = z.enum(['id','rarity','type','primaryAttribute','name','description','quantity','abjuration','conjuration','divination','enchantment','evocation','illusion','necromancy','transmutation','userId']);

<<<<<<< HEAD
export const CoordinatesScalarFieldEnumSchema = z.enum(['id','head','torso','waist','leftForearm','leftHand','rightForearm','rightHand','leftKnee','leftFoot','rightKnee','rightFoot']);

export const SolutionOrderScalarFieldEnumSchema = z.enum(['id','order']);

export const CursorCoordinatesScalarFieldEnumSchema = z.enum(['id','coordinates','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

=======
export const SortOrderSchema = z.enum(['asc','desc']);

>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

<<<<<<< HEAD
export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

=======
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
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
// PUZZLE ELEMENTAL TRIALS SCHEMA
/////////////////////////////////////////

export const PuzzleElementalTrialsSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  firegem: z.boolean(),
  airgem: z.boolean(),
  earthgem: z.boolean(),
  watergem: z.boolean(),
})

export type PuzzleElementalTrials = z.infer<typeof PuzzleElementalTrialsSchema>

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
<<<<<<< HEAD
// COORDINATES SCHEMA
/////////////////////////////////////////

export const CoordinatesSchema = z.object({
  id: z.string().cuid(),
  head: JsonValueSchema,
  torso: JsonValueSchema,
  waist: JsonValueSchema,
  leftForearm: JsonValueSchema,
  leftHand: JsonValueSchema,
  rightForearm: JsonValueSchema,
  rightHand: JsonValueSchema,
  leftKnee: JsonValueSchema,
  leftFoot: JsonValueSchema,
  rightKnee: JsonValueSchema,
  rightFoot: JsonValueSchema,
})

export type Coordinates = z.infer<typeof CoordinatesSchema>

/////////////////////////////////////////
// SOLUTION ORDER SCHEMA
/////////////////////////////////////////

export const SolutionOrderSchema = z.object({
  id: z.string().cuid(),
  order: JsonValueSchema,
})

export type SolutionOrder = z.infer<typeof SolutionOrderSchema>

/////////////////////////////////////////
// CURSOR COORDINATES SCHEMA
/////////////////////////////////////////

export const CursorCoordinatesSchema = z.object({
  id: z.string().cuid(),
  coordinates: JsonValueSchema.nullable(),
  userId: z.string().nullable(),
})

export type CursorCoordinates = z.infer<typeof CursorCoordinatesSchema>

/////////////////////////////////////////
=======
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
// SELECT & INCLUDE
/////////////////////////////////////////

// PUZZLE ELEMENTAL TRIALS
//------------------------------------------------------

export const PuzzleElementalTrialsIncludeSchema: z.ZodType<Prisma.PuzzleElementalTrialsInclude> = z.object({
  chat: z.union([z.boolean(),z.lazy(() => PuzzleChatMessageFindManyArgsSchema)]).optional(),
  players: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PuzzleElementalTrialsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PuzzleElementalTrialsArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsDefaultArgs> = z.object({
  select: z.lazy(() => PuzzleElementalTrialsSelectSchema).optional(),
  include: z.lazy(() => PuzzleElementalTrialsIncludeSchema).optional(),
}).strict();

export const PuzzleElementalTrialsCountOutputTypeArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PuzzleElementalTrialsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PuzzleElementalTrialsCountOutputTypeSelectSchema: z.ZodType<Prisma.PuzzleElementalTrialsCountOutputTypeSelect> = z.object({
  chat: z.boolean().optional(),
  players: z.boolean().optional(),
}).strict();

export const PuzzleElementalTrialsSelectSchema: z.ZodType<Prisma.PuzzleElementalTrialsSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  firegem: z.boolean().optional(),
  airgem: z.boolean().optional(),
  earthgem: z.boolean().optional(),
  watergem: z.boolean().optional(),
  chat: z.union([z.boolean(),z.lazy(() => PuzzleChatMessageFindManyArgsSchema)]).optional(),
  players: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PuzzleElementalTrialsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PUZZLE CHAT MESSAGE
//------------------------------------------------------

export const PuzzleChatMessageIncludeSchema: z.ZodType<Prisma.PuzzleChatMessageInclude> = z.object({
  session: z.union([z.boolean(),z.lazy(() => PuzzleElementalTrialsArgsSchema)]).optional(),
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
  session: z.union([z.boolean(),z.lazy(() => PuzzleElementalTrialsArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  PuzzleElementalTrials: z.union([z.boolean(),z.lazy(() => PuzzleElementalTrialsFindManyArgsSchema)]).optional(),
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
  PuzzleElementalTrials: z.boolean().optional(),
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
  PuzzleElementalTrials: z.union([z.boolean(),z.lazy(() => PuzzleElementalTrialsFindManyArgsSchema)]).optional(),
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

<<<<<<< HEAD
// COORDINATES
//------------------------------------------------------

export const CoordinatesSelectSchema: z.ZodType<Prisma.CoordinatesSelect> = z.object({
  id: z.boolean().optional(),
  head: z.boolean().optional(),
  torso: z.boolean().optional(),
  waist: z.boolean().optional(),
  leftForearm: z.boolean().optional(),
  leftHand: z.boolean().optional(),
  rightForearm: z.boolean().optional(),
  rightHand: z.boolean().optional(),
  leftKnee: z.boolean().optional(),
  leftFoot: z.boolean().optional(),
  rightKnee: z.boolean().optional(),
  rightFoot: z.boolean().optional(),
}).strict()

// SOLUTION ORDER
//------------------------------------------------------

export const SolutionOrderSelectSchema: z.ZodType<Prisma.SolutionOrderSelect> = z.object({
  id: z.boolean().optional(),
  order: z.boolean().optional(),
}).strict()

// CURSOR COORDINATES
//------------------------------------------------------

export const CursorCoordinatesSelectSchema: z.ZodType<Prisma.CursorCoordinatesSelect> = z.object({
  id: z.boolean().optional(),
  coordinates: z.boolean().optional(),
  userId: z.boolean().optional(),
}).strict()

=======
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const PuzzleElementalTrialsWhereInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleElementalTrialsWhereInputSchema),z.lazy(() => PuzzleElementalTrialsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleElementalTrialsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleElementalTrialsWhereInputSchema),z.lazy(() => PuzzleElementalTrialsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  firegem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  airgem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  earthgem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  watergem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageListRelationFilterSchema).optional(),
  players: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict();

export const PuzzleElementalTrialsOrderByWithRelationInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  firegem: z.lazy(() => SortOrderSchema).optional(),
  airgem: z.lazy(() => SortOrderSchema).optional(),
  earthgem: z.lazy(() => SortOrderSchema).optional(),
  watergem: z.lazy(() => SortOrderSchema).optional(),
  chat: z.lazy(() => PuzzleChatMessageOrderByRelationAggregateInputSchema).optional(),
  players: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsWhereUniqueInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PuzzleElementalTrialsWhereInputSchema),z.lazy(() => PuzzleElementalTrialsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleElementalTrialsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleElementalTrialsWhereInputSchema),z.lazy(() => PuzzleElementalTrialsWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  firegem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  airgem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  earthgem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  watergem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageListRelationFilterSchema).optional(),
  players: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict());

export const PuzzleElementalTrialsOrderByWithAggregationInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  firegem: z.lazy(() => SortOrderSchema).optional(),
  airgem: z.lazy(() => SortOrderSchema).optional(),
  earthgem: z.lazy(() => SortOrderSchema).optional(),
  watergem: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PuzzleElementalTrialsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PuzzleElementalTrialsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PuzzleElementalTrialsMinOrderByAggregateInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleElementalTrialsScalarWhereWithAggregatesInputSchema),z.lazy(() => PuzzleElementalTrialsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleElementalTrialsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleElementalTrialsScalarWhereWithAggregatesInputSchema),z.lazy(() => PuzzleElementalTrialsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  firegem: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  airgem: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  earthgem: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  watergem: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
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
<<<<<<< HEAD
  session: z.union([ z.lazy(() => PuzzleElementalTrialsNullableRelationFilterSchema),z.lazy(() => PuzzleElementalTrialsWhereInputSchema) ]).optional().nullable(),
=======
  session: z.union([ z.lazy(() => PuzzleElementalTrialsRelationFilterSchema),z.lazy(() => PuzzleElementalTrialsWhereInputSchema) ]).optional(),
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
}).strict();

export const PuzzleChatMessageOrderByWithRelationInputSchema: z.ZodType<Prisma.PuzzleChatMessageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  session: z.lazy(() => PuzzleElementalTrialsOrderByWithRelationInputSchema).optional()
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
<<<<<<< HEAD
  session: z.union([ z.lazy(() => PuzzleElementalTrialsNullableRelationFilterSchema),z.lazy(() => PuzzleElementalTrialsWhereInputSchema) ]).optional().nullable(),
=======
  session: z.union([ z.lazy(() => PuzzleElementalTrialsRelationFilterSchema),z.lazy(() => PuzzleElementalTrialsWhereInputSchema) ]).optional(),
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsListRelationFilterSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsOrderByRelationAggregateInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsListRelationFilterSchema).optional(),
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

<<<<<<< HEAD
export const CoordinatesWhereInputSchema: z.ZodType<Prisma.CoordinatesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CoordinatesWhereInputSchema),z.lazy(() => CoordinatesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CoordinatesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CoordinatesWhereInputSchema),z.lazy(() => CoordinatesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  head: z.lazy(() => JsonFilterSchema).optional(),
  torso: z.lazy(() => JsonFilterSchema).optional(),
  waist: z.lazy(() => JsonFilterSchema).optional(),
  leftForearm: z.lazy(() => JsonFilterSchema).optional(),
  leftHand: z.lazy(() => JsonFilterSchema).optional(),
  rightForearm: z.lazy(() => JsonFilterSchema).optional(),
  rightHand: z.lazy(() => JsonFilterSchema).optional(),
  leftKnee: z.lazy(() => JsonFilterSchema).optional(),
  leftFoot: z.lazy(() => JsonFilterSchema).optional(),
  rightKnee: z.lazy(() => JsonFilterSchema).optional(),
  rightFoot: z.lazy(() => JsonFilterSchema).optional()
}).strict();

export const CoordinatesOrderByWithRelationInputSchema: z.ZodType<Prisma.CoordinatesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  head: z.lazy(() => SortOrderSchema).optional(),
  torso: z.lazy(() => SortOrderSchema).optional(),
  waist: z.lazy(() => SortOrderSchema).optional(),
  leftForearm: z.lazy(() => SortOrderSchema).optional(),
  leftHand: z.lazy(() => SortOrderSchema).optional(),
  rightForearm: z.lazy(() => SortOrderSchema).optional(),
  rightHand: z.lazy(() => SortOrderSchema).optional(),
  leftKnee: z.lazy(() => SortOrderSchema).optional(),
  leftFoot: z.lazy(() => SortOrderSchema).optional(),
  rightKnee: z.lazy(() => SortOrderSchema).optional(),
  rightFoot: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordinatesWhereUniqueInputSchema: z.ZodType<Prisma.CoordinatesWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CoordinatesWhereInputSchema),z.lazy(() => CoordinatesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CoordinatesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CoordinatesWhereInputSchema),z.lazy(() => CoordinatesWhereInputSchema).array() ]).optional(),
  head: z.lazy(() => JsonFilterSchema).optional(),
  torso: z.lazy(() => JsonFilterSchema).optional(),
  waist: z.lazy(() => JsonFilterSchema).optional(),
  leftForearm: z.lazy(() => JsonFilterSchema).optional(),
  leftHand: z.lazy(() => JsonFilterSchema).optional(),
  rightForearm: z.lazy(() => JsonFilterSchema).optional(),
  rightHand: z.lazy(() => JsonFilterSchema).optional(),
  leftKnee: z.lazy(() => JsonFilterSchema).optional(),
  leftFoot: z.lazy(() => JsonFilterSchema).optional(),
  rightKnee: z.lazy(() => JsonFilterSchema).optional(),
  rightFoot: z.lazy(() => JsonFilterSchema).optional()
}).strict());

export const CoordinatesOrderByWithAggregationInputSchema: z.ZodType<Prisma.CoordinatesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  head: z.lazy(() => SortOrderSchema).optional(),
  torso: z.lazy(() => SortOrderSchema).optional(),
  waist: z.lazy(() => SortOrderSchema).optional(),
  leftForearm: z.lazy(() => SortOrderSchema).optional(),
  leftHand: z.lazy(() => SortOrderSchema).optional(),
  rightForearm: z.lazy(() => SortOrderSchema).optional(),
  rightHand: z.lazy(() => SortOrderSchema).optional(),
  leftKnee: z.lazy(() => SortOrderSchema).optional(),
  leftFoot: z.lazy(() => SortOrderSchema).optional(),
  rightKnee: z.lazy(() => SortOrderSchema).optional(),
  rightFoot: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CoordinatesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CoordinatesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CoordinatesMinOrderByAggregateInputSchema).optional()
}).strict();

export const CoordinatesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CoordinatesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CoordinatesScalarWhereWithAggregatesInputSchema),z.lazy(() => CoordinatesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CoordinatesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CoordinatesScalarWhereWithAggregatesInputSchema),z.lazy(() => CoordinatesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  head: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  torso: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  waist: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  leftForearm: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  leftHand: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  rightForearm: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  rightHand: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  leftKnee: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  leftFoot: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  rightKnee: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  rightFoot: z.lazy(() => JsonWithAggregatesFilterSchema).optional()
}).strict();

export const SolutionOrderWhereInputSchema: z.ZodType<Prisma.SolutionOrderWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SolutionOrderWhereInputSchema),z.lazy(() => SolutionOrderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SolutionOrderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SolutionOrderWhereInputSchema),z.lazy(() => SolutionOrderWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.lazy(() => JsonFilterSchema).optional()
}).strict();

export const SolutionOrderOrderByWithRelationInputSchema: z.ZodType<Prisma.SolutionOrderOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SolutionOrderWhereUniqueInputSchema: z.ZodType<Prisma.SolutionOrderWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => SolutionOrderWhereInputSchema),z.lazy(() => SolutionOrderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SolutionOrderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SolutionOrderWhereInputSchema),z.lazy(() => SolutionOrderWhereInputSchema).array() ]).optional(),
  order: z.lazy(() => JsonFilterSchema).optional()
}).strict());

export const SolutionOrderOrderByWithAggregationInputSchema: z.ZodType<Prisma.SolutionOrderOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SolutionOrderCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SolutionOrderMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SolutionOrderMinOrderByAggregateInputSchema).optional()
}).strict();

export const SolutionOrderScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SolutionOrderScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SolutionOrderScalarWhereWithAggregatesInputSchema),z.lazy(() => SolutionOrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SolutionOrderScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SolutionOrderScalarWhereWithAggregatesInputSchema),z.lazy(() => SolutionOrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  order: z.lazy(() => JsonWithAggregatesFilterSchema).optional()
}).strict();

export const CursorCoordinatesWhereInputSchema: z.ZodType<Prisma.CursorCoordinatesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CursorCoordinatesWhereInputSchema),z.lazy(() => CursorCoordinatesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CursorCoordinatesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CursorCoordinatesWhereInputSchema),z.lazy(() => CursorCoordinatesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  coordinates: z.lazy(() => JsonNullableFilterSchema).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CursorCoordinatesOrderByWithRelationInputSchema: z.ZodType<Prisma.CursorCoordinatesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  coordinates: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const CursorCoordinatesWhereUniqueInputSchema: z.ZodType<Prisma.CursorCoordinatesWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => CursorCoordinatesWhereInputSchema),z.lazy(() => CursorCoordinatesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CursorCoordinatesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CursorCoordinatesWhereInputSchema),z.lazy(() => CursorCoordinatesWhereInputSchema).array() ]).optional(),
  coordinates: z.lazy(() => JsonNullableFilterSchema).optional()
}).strict());

export const CursorCoordinatesOrderByWithAggregationInputSchema: z.ZodType<Prisma.CursorCoordinatesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  coordinates: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CursorCoordinatesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CursorCoordinatesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CursorCoordinatesMinOrderByAggregateInputSchema).optional()
}).strict();

export const CursorCoordinatesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CursorCoordinatesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CursorCoordinatesScalarWhereWithAggregatesInputSchema),z.lazy(() => CursorCoordinatesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CursorCoordinatesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CursorCoordinatesScalarWhereWithAggregatesInputSchema),z.lazy(() => CursorCoordinatesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  coordinates: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

=======
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
export const PuzzleElementalTrialsCreateInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  firegem: z.boolean().optional(),
  airgem: z.boolean().optional(),
  earthgem: z.boolean().optional(),
  watergem: z.boolean().optional(),
  chat: z.lazy(() => PuzzleChatMessageCreateNestedManyWithoutSessionInputSchema).optional(),
  players: z.lazy(() => UserCreateNestedManyWithoutPuzzleElementalTrialsInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsUncheckedCreateInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  firegem: z.boolean().optional(),
  airgem: z.boolean().optional(),
  earthgem: z.boolean().optional(),
  watergem: z.boolean().optional(),
  chat: z.lazy(() => PuzzleChatMessageUncheckedCreateNestedManyWithoutSessionInputSchema).optional(),
  players: z.lazy(() => UserUncheckedCreateNestedManyWithoutPuzzleElementalTrialsInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsUpdateInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  firegem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  airgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  earthgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  watergem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageUpdateManyWithoutSessionNestedInputSchema).optional(),
  players: z.lazy(() => UserUpdateManyWithoutPuzzleElementalTrialsNestedInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsUncheckedUpdateInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  firegem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  airgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  earthgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  watergem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageUncheckedUpdateManyWithoutSessionNestedInputSchema).optional(),
  players: z.lazy(() => UserUncheckedUpdateManyWithoutPuzzleElementalTrialsNestedInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsCreateManyInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  firegem: z.boolean().optional(),
  airgem: z.boolean().optional(),
  earthgem: z.boolean().optional(),
  watergem: z.boolean().optional()
}).strict();

export const PuzzleElementalTrialsUpdateManyMutationInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  firegem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  airgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  earthgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  watergem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleElementalTrialsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  firegem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  airgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  earthgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  watergem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PuzzleChatMessageCreateInputSchema: z.ZodType<Prisma.PuzzleChatMessageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  message: z.string(),
  createdAt: z.coerce.date().optional(),
<<<<<<< HEAD
  session: z.lazy(() => PuzzleElementalTrialsCreateNestedOneWithoutChatInputSchema).optional()
=======
  session: z.lazy(() => PuzzleElementalTrialsCreateNestedOneWithoutChatInputSchema)
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
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
<<<<<<< HEAD
  session: z.lazy(() => PuzzleElementalTrialsUpdateOneWithoutChatNestedInputSchema).optional()
=======
  session: z.lazy(() => PuzzleElementalTrialsUpdateOneRequiredWithoutChatNestedInputSchema).optional()
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
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

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string(),
  imgUrl: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsCreateNestedManyWithoutPlayersInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsUncheckedCreateNestedManyWithoutPlayersInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsUpdateManyWithoutPlayersNestedInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsUncheckedUpdateManyWithoutPlayersNestedInputSchema).optional(),
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

<<<<<<< HEAD
export const CoordinatesCreateInputSchema: z.ZodType<Prisma.CoordinatesCreateInput> = z.object({
  id: z.string().cuid().optional(),
  head: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  torso: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  waist: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  leftForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  leftHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  rightForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  rightHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  leftKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  leftFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  rightKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  rightFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const CoordinatesUncheckedCreateInputSchema: z.ZodType<Prisma.CoordinatesUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  head: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  torso: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  waist: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  leftForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  leftHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  rightForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  rightHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  leftKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  leftFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  rightKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  rightFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const CoordinatesUpdateInputSchema: z.ZodType<Prisma.CoordinatesUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  head: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  torso: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  waist: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const CoordinatesUncheckedUpdateInputSchema: z.ZodType<Prisma.CoordinatesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  head: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  torso: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  waist: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const CoordinatesCreateManyInputSchema: z.ZodType<Prisma.CoordinatesCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  head: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  torso: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  waist: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  leftForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  leftHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  rightForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  rightHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  leftKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  leftFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  rightKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  rightFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const CoordinatesUpdateManyMutationInputSchema: z.ZodType<Prisma.CoordinatesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  head: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  torso: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  waist: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const CoordinatesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CoordinatesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  head: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  torso: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  waist: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightForearm: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightHand: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  leftFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightKnee: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  rightFoot: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const SolutionOrderCreateInputSchema: z.ZodType<Prisma.SolutionOrderCreateInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const SolutionOrderUncheckedCreateInputSchema: z.ZodType<Prisma.SolutionOrderUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const SolutionOrderUpdateInputSchema: z.ZodType<Prisma.SolutionOrderUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const SolutionOrderUncheckedUpdateInputSchema: z.ZodType<Prisma.SolutionOrderUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const SolutionOrderCreateManyInputSchema: z.ZodType<Prisma.SolutionOrderCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const SolutionOrderUpdateManyMutationInputSchema: z.ZodType<Prisma.SolutionOrderUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const SolutionOrderUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SolutionOrderUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const CursorCoordinatesCreateInputSchema: z.ZodType<Prisma.CursorCoordinatesCreateInput> = z.object({
  id: z.string().cuid().optional(),
  coordinates: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.string().optional().nullable()
}).strict();

export const CursorCoordinatesUncheckedCreateInputSchema: z.ZodType<Prisma.CursorCoordinatesUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  coordinates: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.string().optional().nullable()
}).strict();

export const CursorCoordinatesUpdateInputSchema: z.ZodType<Prisma.CursorCoordinatesUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coordinates: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CursorCoordinatesUncheckedUpdateInputSchema: z.ZodType<Prisma.CursorCoordinatesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coordinates: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CursorCoordinatesCreateManyInputSchema: z.ZodType<Prisma.CursorCoordinatesCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  coordinates: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.string().optional().nullable()
}).strict();

export const CursorCoordinatesUpdateManyMutationInputSchema: z.ZodType<Prisma.CursorCoordinatesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coordinates: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CursorCoordinatesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CursorCoordinatesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coordinates: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

=======
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
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

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
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

export const PuzzleChatMessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PuzzleChatMessageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleElementalTrialsCountOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  firegem: z.lazy(() => SortOrderSchema).optional(),
  airgem: z.lazy(() => SortOrderSchema).optional(),
  earthgem: z.lazy(() => SortOrderSchema).optional(),
  watergem: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleElementalTrialsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  firegem: z.lazy(() => SortOrderSchema).optional(),
  airgem: z.lazy(() => SortOrderSchema).optional(),
  earthgem: z.lazy(() => SortOrderSchema).optional(),
  watergem: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PuzzleElementalTrialsMinOrderByAggregateInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  firegem: z.lazy(() => SortOrderSchema).optional(),
  airgem: z.lazy(() => SortOrderSchema).optional(),
  earthgem: z.lazy(() => SortOrderSchema).optional(),
  watergem: z.lazy(() => SortOrderSchema).optional()
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

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

<<<<<<< HEAD
export const PuzzleElementalTrialsNullableRelationFilterSchema: z.ZodType<Prisma.PuzzleElementalTrialsNullableRelationFilter> = z.object({
  is: z.lazy(() => PuzzleElementalTrialsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PuzzleElementalTrialsWhereInputSchema).optional().nullable()
=======
export const PuzzleElementalTrialsRelationFilterSchema: z.ZodType<Prisma.PuzzleElementalTrialsRelationFilter> = z.object({
  is: z.lazy(() => PuzzleElementalTrialsWhereInputSchema).optional(),
  isNot: z.lazy(() => PuzzleElementalTrialsWhereInputSchema).optional()
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
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

export const PuzzleElementalTrialsListRelationFilterSchema: z.ZodType<Prisma.PuzzleElementalTrialsListRelationFilter> = z.object({
  every: z.lazy(() => PuzzleElementalTrialsWhereInputSchema).optional(),
  some: z.lazy(() => PuzzleElementalTrialsWhereInputSchema).optional(),
  none: z.lazy(() => PuzzleElementalTrialsWhereInputSchema).optional()
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

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const PuzzleElementalTrialsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
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

<<<<<<< HEAD
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

export const CoordinatesCountOrderByAggregateInputSchema: z.ZodType<Prisma.CoordinatesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  head: z.lazy(() => SortOrderSchema).optional(),
  torso: z.lazy(() => SortOrderSchema).optional(),
  waist: z.lazy(() => SortOrderSchema).optional(),
  leftForearm: z.lazy(() => SortOrderSchema).optional(),
  leftHand: z.lazy(() => SortOrderSchema).optional(),
  rightForearm: z.lazy(() => SortOrderSchema).optional(),
  rightHand: z.lazy(() => SortOrderSchema).optional(),
  leftKnee: z.lazy(() => SortOrderSchema).optional(),
  leftFoot: z.lazy(() => SortOrderSchema).optional(),
  rightKnee: z.lazy(() => SortOrderSchema).optional(),
  rightFoot: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordinatesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CoordinatesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordinatesMinOrderByAggregateInputSchema: z.ZodType<Prisma.CoordinatesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
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

export const SolutionOrderCountOrderByAggregateInputSchema: z.ZodType<Prisma.SolutionOrderCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SolutionOrderMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SolutionOrderMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SolutionOrderMinOrderByAggregateInputSchema: z.ZodType<Prisma.SolutionOrderMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
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

export const CursorCoordinatesCountOrderByAggregateInputSchema: z.ZodType<Prisma.CursorCoordinatesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  coordinates: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CursorCoordinatesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CursorCoordinatesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CursorCoordinatesMinOrderByAggregateInputSchema: z.ZodType<Prisma.CursorCoordinatesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
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
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

=======
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
export const PuzzleChatMessageCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageCreateNestedManyWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema).array(),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleChatMessageCreateOrConnectWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PuzzleChatMessageCreateManySessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutPuzzleElementalTrialsInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutPuzzleElementalTrialsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserCreateWithoutPuzzleElementalTrialsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserCreateOrConnectWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PuzzleChatMessageUncheckedCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.PuzzleChatMessageUncheckedCreateNestedManyWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageCreateWithoutSessionInputSchema).array(),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleChatMessageCreateOrConnectWithoutSessionInputSchema),z.lazy(() => PuzzleChatMessageCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PuzzleChatMessageCreateManySessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema),z.lazy(() => PuzzleChatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutPuzzleElementalTrialsInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutPuzzleElementalTrialsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserCreateWithoutPuzzleElementalTrialsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserCreateOrConnectWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
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

export const UserUpdateManyWithoutPuzzleElementalTrialsNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutPuzzleElementalTrialsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserCreateWithoutPuzzleElementalTrialsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserCreateOrConnectWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
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

export const UserUncheckedUpdateManyWithoutPuzzleElementalTrialsNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutPuzzleElementalTrialsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserCreateWithoutPuzzleElementalTrialsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserCreateOrConnectWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutPuzzleElementalTrialsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PuzzleElementalTrialsCreateNestedOneWithoutChatInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsCreateNestedOneWithoutChatInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleElementalTrialsCreateWithoutChatInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutChatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PuzzleElementalTrialsCreateOrConnectWithoutChatInputSchema).optional(),
  connect: z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema).optional()
}).strict();

<<<<<<< HEAD
export const PuzzleElementalTrialsUpdateOneWithoutChatNestedInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpdateOneWithoutChatNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleElementalTrialsCreateWithoutChatInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutChatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PuzzleElementalTrialsCreateOrConnectWithoutChatInputSchema).optional(),
  upsert: z.lazy(() => PuzzleElementalTrialsUpsertWithoutChatInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PuzzleElementalTrialsWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PuzzleElementalTrialsWhereInputSchema) ]).optional(),
=======
export const PuzzleElementalTrialsUpdateOneRequiredWithoutChatNestedInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpdateOneRequiredWithoutChatNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleElementalTrialsCreateWithoutChatInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutChatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PuzzleElementalTrialsCreateOrConnectWithoutChatInputSchema).optional(),
  upsert: z.lazy(() => PuzzleElementalTrialsUpsertWithoutChatInputSchema).optional(),
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
  connect: z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PuzzleElementalTrialsUpdateToOneWithWhereWithoutChatInputSchema),z.lazy(() => PuzzleElementalTrialsUpdateWithoutChatInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedUpdateWithoutChatInputSchema) ]).optional(),
}).strict();

export const PuzzleElementalTrialsCreateNestedManyWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsCreateNestedManyWithoutPlayersInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleElementalTrialsCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsCreateWithoutPlayersInputSchema).array(),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutPlayersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleElementalTrialsCreateOrConnectWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsCreateOrConnectWithoutPlayersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema).array() ]).optional(),
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

export const PuzzleElementalTrialsUncheckedCreateNestedManyWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUncheckedCreateNestedManyWithoutPlayersInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleElementalTrialsCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsCreateWithoutPlayersInputSchema).array(),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutPlayersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleElementalTrialsCreateOrConnectWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsCreateOrConnectWithoutPlayersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema).array() ]).optional(),
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

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const PuzzleElementalTrialsUpdateManyWithoutPlayersNestedInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpdateManyWithoutPlayersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleElementalTrialsCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsCreateWithoutPlayersInputSchema).array(),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutPlayersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleElementalTrialsCreateOrConnectWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsCreateOrConnectWithoutPlayersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PuzzleElementalTrialsUpsertWithWhereUniqueWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUpsertWithWhereUniqueWithoutPlayersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PuzzleElementalTrialsUpdateWithWhereUniqueWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUpdateWithWhereUniqueWithoutPlayersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PuzzleElementalTrialsUpdateManyWithWhereWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUpdateManyWithWhereWithoutPlayersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PuzzleElementalTrialsScalarWhereInputSchema),z.lazy(() => PuzzleElementalTrialsScalarWhereInputSchema).array() ]).optional(),
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

export const PuzzleElementalTrialsUncheckedUpdateManyWithoutPlayersNestedInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUncheckedUpdateManyWithoutPlayersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PuzzleElementalTrialsCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsCreateWithoutPlayersInputSchema).array(),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutPlayersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PuzzleElementalTrialsCreateOrConnectWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsCreateOrConnectWithoutPlayersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PuzzleElementalTrialsUpsertWithWhereUniqueWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUpsertWithWhereUniqueWithoutPlayersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PuzzleElementalTrialsUpdateWithWhereUniqueWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUpdateWithWhereUniqueWithoutPlayersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PuzzleElementalTrialsUpdateManyWithWhereWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUpdateManyWithWhereWithoutPlayersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PuzzleElementalTrialsScalarWhereInputSchema),z.lazy(() => PuzzleElementalTrialsScalarWhereInputSchema).array() ]).optional(),
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

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
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

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
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

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
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

<<<<<<< HEAD
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

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
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

=======
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
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

export const UserCreateWithoutPuzzleElementalTrialsInputSchema: z.ZodType<Prisma.UserCreateWithoutPuzzleElementalTrialsInput> = z.object({
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

export const UserUncheckedCreateWithoutPuzzleElementalTrialsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPuzzleElementalTrialsInput> = z.object({
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

export const UserCreateOrConnectWithoutPuzzleElementalTrialsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPuzzleElementalTrialsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPuzzleElementalTrialsInputSchema) ]),
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

export const UserUpsertWithWhereUniqueWithoutPuzzleElementalTrialsInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutPuzzleElementalTrialsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPuzzleElementalTrialsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPuzzleElementalTrialsInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutPuzzleElementalTrialsInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutPuzzleElementalTrialsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutPuzzleElementalTrialsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPuzzleElementalTrialsInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutPuzzleElementalTrialsInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutPuzzleElementalTrialsInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutPuzzleElementalTrialsInputSchema) ]),
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

export const PuzzleElementalTrialsCreateWithoutChatInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsCreateWithoutChatInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  firegem: z.boolean().optional(),
  airgem: z.boolean().optional(),
  earthgem: z.boolean().optional(),
  watergem: z.boolean().optional(),
  players: z.lazy(() => UserCreateNestedManyWithoutPuzzleElementalTrialsInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsUncheckedCreateWithoutChatInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUncheckedCreateWithoutChatInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  firegem: z.boolean().optional(),
  airgem: z.boolean().optional(),
  earthgem: z.boolean().optional(),
  watergem: z.boolean().optional(),
  players: z.lazy(() => UserUncheckedCreateNestedManyWithoutPuzzleElementalTrialsInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsCreateOrConnectWithoutChatInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsCreateOrConnectWithoutChatInput> = z.object({
  where: z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PuzzleElementalTrialsCreateWithoutChatInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutChatInputSchema) ]),
}).strict();

export const PuzzleElementalTrialsUpsertWithoutChatInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpsertWithoutChatInput> = z.object({
  update: z.union([ z.lazy(() => PuzzleElementalTrialsUpdateWithoutChatInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedUpdateWithoutChatInputSchema) ]),
  create: z.union([ z.lazy(() => PuzzleElementalTrialsCreateWithoutChatInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutChatInputSchema) ]),
  where: z.lazy(() => PuzzleElementalTrialsWhereInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsUpdateToOneWithWhereWithoutChatInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpdateToOneWithWhereWithoutChatInput> = z.object({
  where: z.lazy(() => PuzzleElementalTrialsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PuzzleElementalTrialsUpdateWithoutChatInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedUpdateWithoutChatInputSchema) ]),
}).strict();

export const PuzzleElementalTrialsUpdateWithoutChatInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpdateWithoutChatInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  firegem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  airgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  earthgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  watergem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => UserUpdateManyWithoutPuzzleElementalTrialsNestedInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsUncheckedUpdateWithoutChatInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUncheckedUpdateWithoutChatInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  firegem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  airgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  earthgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  watergem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => UserUncheckedUpdateManyWithoutPuzzleElementalTrialsNestedInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsCreateWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsCreateWithoutPlayersInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  firegem: z.boolean().optional(),
  airgem: z.boolean().optional(),
  earthgem: z.boolean().optional(),
  watergem: z.boolean().optional(),
  chat: z.lazy(() => PuzzleChatMessageCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsUncheckedCreateWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUncheckedCreateWithoutPlayersInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  firegem: z.boolean().optional(),
  airgem: z.boolean().optional(),
  earthgem: z.boolean().optional(),
  watergem: z.boolean().optional(),
  chat: z.lazy(() => PuzzleChatMessageUncheckedCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsCreateOrConnectWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsCreateOrConnectWithoutPlayersInput> = z.object({
  where: z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PuzzleElementalTrialsCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutPlayersInputSchema) ]),
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

export const PuzzleElementalTrialsUpsertWithWhereUniqueWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpsertWithWhereUniqueWithoutPlayersInput> = z.object({
  where: z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PuzzleElementalTrialsUpdateWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedUpdateWithoutPlayersInputSchema) ]),
  create: z.union([ z.lazy(() => PuzzleElementalTrialsCreateWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedCreateWithoutPlayersInputSchema) ]),
}).strict();

export const PuzzleElementalTrialsUpdateWithWhereUniqueWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpdateWithWhereUniqueWithoutPlayersInput> = z.object({
  where: z.lazy(() => PuzzleElementalTrialsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PuzzleElementalTrialsUpdateWithoutPlayersInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedUpdateWithoutPlayersInputSchema) ]),
}).strict();

export const PuzzleElementalTrialsUpdateManyWithWhereWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpdateManyWithWhereWithoutPlayersInput> = z.object({
  where: z.lazy(() => PuzzleElementalTrialsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PuzzleElementalTrialsUpdateManyMutationInputSchema),z.lazy(() => PuzzleElementalTrialsUncheckedUpdateManyWithoutPlayersInputSchema) ]),
}).strict();

export const PuzzleElementalTrialsScalarWhereInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PuzzleElementalTrialsScalarWhereInputSchema),z.lazy(() => PuzzleElementalTrialsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PuzzleElementalTrialsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PuzzleElementalTrialsScalarWhereInputSchema),z.lazy(() => PuzzleElementalTrialsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  firegem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  airgem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  earthgem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  watergem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsCreateNestedManyWithoutPlayersInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsUncheckedCreateNestedManyWithoutPlayersInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsUpdateManyWithoutPlayersNestedInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsUncheckedUpdateManyWithoutPlayersNestedInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsCreateNestedManyWithoutPlayersInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsUncheckedCreateNestedManyWithoutPlayersInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsUpdateManyWithoutPlayersNestedInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsUncheckedUpdateManyWithoutPlayersNestedInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsCreateNestedManyWithoutPlayersInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsUncheckedCreateNestedManyWithoutPlayersInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsUpdateManyWithoutPlayersNestedInputSchema).optional(),
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
  PuzzleElementalTrials: z.lazy(() => PuzzleElementalTrialsUncheckedUpdateManyWithoutPlayersNestedInputSchema).optional(),
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

export const UserUpdateWithoutPuzzleElementalTrialsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPuzzleElementalTrialsInput> = z.object({
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

export const UserUncheckedUpdateWithoutPuzzleElementalTrialsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPuzzleElementalTrialsInput> = z.object({
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

export const UserUncheckedUpdateManyWithoutPuzzleElementalTrialsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutPuzzleElementalTrialsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const PuzzleElementalTrialsUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpdateWithoutPlayersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  firegem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  airgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  earthgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  watergem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsUncheckedUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUncheckedUpdateWithoutPlayersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  firegem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  airgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  earthgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  watergem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.lazy(() => PuzzleChatMessageUncheckedUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const PuzzleElementalTrialsUncheckedUpdateManyWithoutPlayersInputSchema: z.ZodType<Prisma.PuzzleElementalTrialsUncheckedUpdateManyWithoutPlayersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  firegem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  airgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  earthgem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  watergem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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

export const PuzzleElementalTrialsFindFirstArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsFindFirstArgs> = z.object({
  select: PuzzleElementalTrialsSelectSchema.optional(),
  include: PuzzleElementalTrialsIncludeSchema.optional(),
  where: PuzzleElementalTrialsWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleElementalTrialsOrderByWithRelationInputSchema.array(),PuzzleElementalTrialsOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleElementalTrialsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleElementalTrialsScalarFieldEnumSchema,PuzzleElementalTrialsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleElementalTrialsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsFindFirstOrThrowArgs> = z.object({
  select: PuzzleElementalTrialsSelectSchema.optional(),
  include: PuzzleElementalTrialsIncludeSchema.optional(),
  where: PuzzleElementalTrialsWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleElementalTrialsOrderByWithRelationInputSchema.array(),PuzzleElementalTrialsOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleElementalTrialsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleElementalTrialsScalarFieldEnumSchema,PuzzleElementalTrialsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleElementalTrialsFindManyArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsFindManyArgs> = z.object({
  select: PuzzleElementalTrialsSelectSchema.optional(),
  include: PuzzleElementalTrialsIncludeSchema.optional(),
  where: PuzzleElementalTrialsWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleElementalTrialsOrderByWithRelationInputSchema.array(),PuzzleElementalTrialsOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleElementalTrialsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PuzzleElementalTrialsScalarFieldEnumSchema,PuzzleElementalTrialsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PuzzleElementalTrialsAggregateArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsAggregateArgs> = z.object({
  where: PuzzleElementalTrialsWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleElementalTrialsOrderByWithRelationInputSchema.array(),PuzzleElementalTrialsOrderByWithRelationInputSchema ]).optional(),
  cursor: PuzzleElementalTrialsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PuzzleElementalTrialsGroupByArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsGroupByArgs> = z.object({
  where: PuzzleElementalTrialsWhereInputSchema.optional(),
  orderBy: z.union([ PuzzleElementalTrialsOrderByWithAggregationInputSchema.array(),PuzzleElementalTrialsOrderByWithAggregationInputSchema ]).optional(),
  by: PuzzleElementalTrialsScalarFieldEnumSchema.array(),
  having: PuzzleElementalTrialsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PuzzleElementalTrialsFindUniqueArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsFindUniqueArgs> = z.object({
  select: PuzzleElementalTrialsSelectSchema.optional(),
  include: PuzzleElementalTrialsIncludeSchema.optional(),
  where: PuzzleElementalTrialsWhereUniqueInputSchema,
}).strict() ;

export const PuzzleElementalTrialsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsFindUniqueOrThrowArgs> = z.object({
  select: PuzzleElementalTrialsSelectSchema.optional(),
  include: PuzzleElementalTrialsIncludeSchema.optional(),
  where: PuzzleElementalTrialsWhereUniqueInputSchema,
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

<<<<<<< HEAD
export const CoordinatesFindFirstArgsSchema: z.ZodType<Prisma.CoordinatesFindFirstArgs> = z.object({
  select: CoordinatesSelectSchema.optional(),
  where: CoordinatesWhereInputSchema.optional(),
  orderBy: z.union([ CoordinatesOrderByWithRelationInputSchema.array(),CoordinatesOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordinatesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CoordinatesScalarFieldEnumSchema,CoordinatesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CoordinatesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CoordinatesFindFirstOrThrowArgs> = z.object({
  select: CoordinatesSelectSchema.optional(),
  where: CoordinatesWhereInputSchema.optional(),
  orderBy: z.union([ CoordinatesOrderByWithRelationInputSchema.array(),CoordinatesOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordinatesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CoordinatesScalarFieldEnumSchema,CoordinatesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CoordinatesFindManyArgsSchema: z.ZodType<Prisma.CoordinatesFindManyArgs> = z.object({
  select: CoordinatesSelectSchema.optional(),
  where: CoordinatesWhereInputSchema.optional(),
  orderBy: z.union([ CoordinatesOrderByWithRelationInputSchema.array(),CoordinatesOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordinatesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CoordinatesScalarFieldEnumSchema,CoordinatesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CoordinatesAggregateArgsSchema: z.ZodType<Prisma.CoordinatesAggregateArgs> = z.object({
  where: CoordinatesWhereInputSchema.optional(),
  orderBy: z.union([ CoordinatesOrderByWithRelationInputSchema.array(),CoordinatesOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordinatesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CoordinatesGroupByArgsSchema: z.ZodType<Prisma.CoordinatesGroupByArgs> = z.object({
  where: CoordinatesWhereInputSchema.optional(),
  orderBy: z.union([ CoordinatesOrderByWithAggregationInputSchema.array(),CoordinatesOrderByWithAggregationInputSchema ]).optional(),
  by: CoordinatesScalarFieldEnumSchema.array(),
  having: CoordinatesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CoordinatesFindUniqueArgsSchema: z.ZodType<Prisma.CoordinatesFindUniqueArgs> = z.object({
  select: CoordinatesSelectSchema.optional(),
  where: CoordinatesWhereUniqueInputSchema,
}).strict() ;

export const CoordinatesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CoordinatesFindUniqueOrThrowArgs> = z.object({
  select: CoordinatesSelectSchema.optional(),
  where: CoordinatesWhereUniqueInputSchema,
}).strict() ;

export const SolutionOrderFindFirstArgsSchema: z.ZodType<Prisma.SolutionOrderFindFirstArgs> = z.object({
  select: SolutionOrderSelectSchema.optional(),
  where: SolutionOrderWhereInputSchema.optional(),
  orderBy: z.union([ SolutionOrderOrderByWithRelationInputSchema.array(),SolutionOrderOrderByWithRelationInputSchema ]).optional(),
  cursor: SolutionOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SolutionOrderScalarFieldEnumSchema,SolutionOrderScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SolutionOrderFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SolutionOrderFindFirstOrThrowArgs> = z.object({
  select: SolutionOrderSelectSchema.optional(),
  where: SolutionOrderWhereInputSchema.optional(),
  orderBy: z.union([ SolutionOrderOrderByWithRelationInputSchema.array(),SolutionOrderOrderByWithRelationInputSchema ]).optional(),
  cursor: SolutionOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SolutionOrderScalarFieldEnumSchema,SolutionOrderScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SolutionOrderFindManyArgsSchema: z.ZodType<Prisma.SolutionOrderFindManyArgs> = z.object({
  select: SolutionOrderSelectSchema.optional(),
  where: SolutionOrderWhereInputSchema.optional(),
  orderBy: z.union([ SolutionOrderOrderByWithRelationInputSchema.array(),SolutionOrderOrderByWithRelationInputSchema ]).optional(),
  cursor: SolutionOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SolutionOrderScalarFieldEnumSchema,SolutionOrderScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SolutionOrderAggregateArgsSchema: z.ZodType<Prisma.SolutionOrderAggregateArgs> = z.object({
  where: SolutionOrderWhereInputSchema.optional(),
  orderBy: z.union([ SolutionOrderOrderByWithRelationInputSchema.array(),SolutionOrderOrderByWithRelationInputSchema ]).optional(),
  cursor: SolutionOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SolutionOrderGroupByArgsSchema: z.ZodType<Prisma.SolutionOrderGroupByArgs> = z.object({
  where: SolutionOrderWhereInputSchema.optional(),
  orderBy: z.union([ SolutionOrderOrderByWithAggregationInputSchema.array(),SolutionOrderOrderByWithAggregationInputSchema ]).optional(),
  by: SolutionOrderScalarFieldEnumSchema.array(),
  having: SolutionOrderScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SolutionOrderFindUniqueArgsSchema: z.ZodType<Prisma.SolutionOrderFindUniqueArgs> = z.object({
  select: SolutionOrderSelectSchema.optional(),
  where: SolutionOrderWhereUniqueInputSchema,
}).strict() ;

export const SolutionOrderFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SolutionOrderFindUniqueOrThrowArgs> = z.object({
  select: SolutionOrderSelectSchema.optional(),
  where: SolutionOrderWhereUniqueInputSchema,
}).strict() ;

export const CursorCoordinatesFindFirstArgsSchema: z.ZodType<Prisma.CursorCoordinatesFindFirstArgs> = z.object({
  select: CursorCoordinatesSelectSchema.optional(),
  where: CursorCoordinatesWhereInputSchema.optional(),
  orderBy: z.union([ CursorCoordinatesOrderByWithRelationInputSchema.array(),CursorCoordinatesOrderByWithRelationInputSchema ]).optional(),
  cursor: CursorCoordinatesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CursorCoordinatesScalarFieldEnumSchema,CursorCoordinatesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CursorCoordinatesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CursorCoordinatesFindFirstOrThrowArgs> = z.object({
  select: CursorCoordinatesSelectSchema.optional(),
  where: CursorCoordinatesWhereInputSchema.optional(),
  orderBy: z.union([ CursorCoordinatesOrderByWithRelationInputSchema.array(),CursorCoordinatesOrderByWithRelationInputSchema ]).optional(),
  cursor: CursorCoordinatesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CursorCoordinatesScalarFieldEnumSchema,CursorCoordinatesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CursorCoordinatesFindManyArgsSchema: z.ZodType<Prisma.CursorCoordinatesFindManyArgs> = z.object({
  select: CursorCoordinatesSelectSchema.optional(),
  where: CursorCoordinatesWhereInputSchema.optional(),
  orderBy: z.union([ CursorCoordinatesOrderByWithRelationInputSchema.array(),CursorCoordinatesOrderByWithRelationInputSchema ]).optional(),
  cursor: CursorCoordinatesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CursorCoordinatesScalarFieldEnumSchema,CursorCoordinatesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CursorCoordinatesAggregateArgsSchema: z.ZodType<Prisma.CursorCoordinatesAggregateArgs> = z.object({
  where: CursorCoordinatesWhereInputSchema.optional(),
  orderBy: z.union([ CursorCoordinatesOrderByWithRelationInputSchema.array(),CursorCoordinatesOrderByWithRelationInputSchema ]).optional(),
  cursor: CursorCoordinatesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CursorCoordinatesGroupByArgsSchema: z.ZodType<Prisma.CursorCoordinatesGroupByArgs> = z.object({
  where: CursorCoordinatesWhereInputSchema.optional(),
  orderBy: z.union([ CursorCoordinatesOrderByWithAggregationInputSchema.array(),CursorCoordinatesOrderByWithAggregationInputSchema ]).optional(),
  by: CursorCoordinatesScalarFieldEnumSchema.array(),
  having: CursorCoordinatesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CursorCoordinatesFindUniqueArgsSchema: z.ZodType<Prisma.CursorCoordinatesFindUniqueArgs> = z.object({
  select: CursorCoordinatesSelectSchema.optional(),
  where: CursorCoordinatesWhereUniqueInputSchema,
}).strict() ;

export const CursorCoordinatesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CursorCoordinatesFindUniqueOrThrowArgs> = z.object({
  select: CursorCoordinatesSelectSchema.optional(),
  where: CursorCoordinatesWhereUniqueInputSchema,
}).strict() ;

=======
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
export const PuzzleElementalTrialsCreateArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsCreateArgs> = z.object({
  select: PuzzleElementalTrialsSelectSchema.optional(),
  include: PuzzleElementalTrialsIncludeSchema.optional(),
  data: z.union([ PuzzleElementalTrialsCreateInputSchema,PuzzleElementalTrialsUncheckedCreateInputSchema ]),
}).strict() ;

export const PuzzleElementalTrialsUpsertArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpsertArgs> = z.object({
  select: PuzzleElementalTrialsSelectSchema.optional(),
  include: PuzzleElementalTrialsIncludeSchema.optional(),
  where: PuzzleElementalTrialsWhereUniqueInputSchema,
  create: z.union([ PuzzleElementalTrialsCreateInputSchema,PuzzleElementalTrialsUncheckedCreateInputSchema ]),
  update: z.union([ PuzzleElementalTrialsUpdateInputSchema,PuzzleElementalTrialsUncheckedUpdateInputSchema ]),
}).strict() ;

export const PuzzleElementalTrialsCreateManyArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsCreateManyArgs> = z.object({
  data: z.union([ PuzzleElementalTrialsCreateManyInputSchema,PuzzleElementalTrialsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PuzzleElementalTrialsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsCreateManyAndReturnArgs> = z.object({
  data: z.union([ PuzzleElementalTrialsCreateManyInputSchema,PuzzleElementalTrialsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PuzzleElementalTrialsDeleteArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsDeleteArgs> = z.object({
  select: PuzzleElementalTrialsSelectSchema.optional(),
  include: PuzzleElementalTrialsIncludeSchema.optional(),
  where: PuzzleElementalTrialsWhereUniqueInputSchema,
}).strict() ;

export const PuzzleElementalTrialsUpdateArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpdateArgs> = z.object({
  select: PuzzleElementalTrialsSelectSchema.optional(),
  include: PuzzleElementalTrialsIncludeSchema.optional(),
  data: z.union([ PuzzleElementalTrialsUpdateInputSchema,PuzzleElementalTrialsUncheckedUpdateInputSchema ]),
  where: PuzzleElementalTrialsWhereUniqueInputSchema,
}).strict() ;

export const PuzzleElementalTrialsUpdateManyArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsUpdateManyArgs> = z.object({
  data: z.union([ PuzzleElementalTrialsUpdateManyMutationInputSchema,PuzzleElementalTrialsUncheckedUpdateManyInputSchema ]),
  where: PuzzleElementalTrialsWhereInputSchema.optional(),
}).strict() ;

export const PuzzleElementalTrialsDeleteManyArgsSchema: z.ZodType<Prisma.PuzzleElementalTrialsDeleteManyArgs> = z.object({
  where: PuzzleElementalTrialsWhereInputSchema.optional(),
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
<<<<<<< HEAD
}).strict() ;

export const CoordinatesCreateArgsSchema: z.ZodType<Prisma.CoordinatesCreateArgs> = z.object({
  select: CoordinatesSelectSchema.optional(),
  data: z.union([ CoordinatesCreateInputSchema,CoordinatesUncheckedCreateInputSchema ]),
}).strict() ;

export const CoordinatesUpsertArgsSchema: z.ZodType<Prisma.CoordinatesUpsertArgs> = z.object({
  select: CoordinatesSelectSchema.optional(),
  where: CoordinatesWhereUniqueInputSchema,
  create: z.union([ CoordinatesCreateInputSchema,CoordinatesUncheckedCreateInputSchema ]),
  update: z.union([ CoordinatesUpdateInputSchema,CoordinatesUncheckedUpdateInputSchema ]),
}).strict() ;

export const CoordinatesCreateManyArgsSchema: z.ZodType<Prisma.CoordinatesCreateManyArgs> = z.object({
  data: z.union([ CoordinatesCreateManyInputSchema,CoordinatesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CoordinatesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CoordinatesCreateManyAndReturnArgs> = z.object({
  data: z.union([ CoordinatesCreateManyInputSchema,CoordinatesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CoordinatesDeleteArgsSchema: z.ZodType<Prisma.CoordinatesDeleteArgs> = z.object({
  select: CoordinatesSelectSchema.optional(),
  where: CoordinatesWhereUniqueInputSchema,
}).strict() ;

export const CoordinatesUpdateArgsSchema: z.ZodType<Prisma.CoordinatesUpdateArgs> = z.object({
  select: CoordinatesSelectSchema.optional(),
  data: z.union([ CoordinatesUpdateInputSchema,CoordinatesUncheckedUpdateInputSchema ]),
  where: CoordinatesWhereUniqueInputSchema,
}).strict() ;

export const CoordinatesUpdateManyArgsSchema: z.ZodType<Prisma.CoordinatesUpdateManyArgs> = z.object({
  data: z.union([ CoordinatesUpdateManyMutationInputSchema,CoordinatesUncheckedUpdateManyInputSchema ]),
  where: CoordinatesWhereInputSchema.optional(),
}).strict() ;

export const CoordinatesDeleteManyArgsSchema: z.ZodType<Prisma.CoordinatesDeleteManyArgs> = z.object({
  where: CoordinatesWhereInputSchema.optional(),
}).strict() ;

export const SolutionOrderCreateArgsSchema: z.ZodType<Prisma.SolutionOrderCreateArgs> = z.object({
  select: SolutionOrderSelectSchema.optional(),
  data: z.union([ SolutionOrderCreateInputSchema,SolutionOrderUncheckedCreateInputSchema ]),
}).strict() ;

export const SolutionOrderUpsertArgsSchema: z.ZodType<Prisma.SolutionOrderUpsertArgs> = z.object({
  select: SolutionOrderSelectSchema.optional(),
  where: SolutionOrderWhereUniqueInputSchema,
  create: z.union([ SolutionOrderCreateInputSchema,SolutionOrderUncheckedCreateInputSchema ]),
  update: z.union([ SolutionOrderUpdateInputSchema,SolutionOrderUncheckedUpdateInputSchema ]),
}).strict() ;

export const SolutionOrderCreateManyArgsSchema: z.ZodType<Prisma.SolutionOrderCreateManyArgs> = z.object({
  data: z.union([ SolutionOrderCreateManyInputSchema,SolutionOrderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SolutionOrderCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SolutionOrderCreateManyAndReturnArgs> = z.object({
  data: z.union([ SolutionOrderCreateManyInputSchema,SolutionOrderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SolutionOrderDeleteArgsSchema: z.ZodType<Prisma.SolutionOrderDeleteArgs> = z.object({
  select: SolutionOrderSelectSchema.optional(),
  where: SolutionOrderWhereUniqueInputSchema,
}).strict() ;

export const SolutionOrderUpdateArgsSchema: z.ZodType<Prisma.SolutionOrderUpdateArgs> = z.object({
  select: SolutionOrderSelectSchema.optional(),
  data: z.union([ SolutionOrderUpdateInputSchema,SolutionOrderUncheckedUpdateInputSchema ]),
  where: SolutionOrderWhereUniqueInputSchema,
}).strict() ;

export const SolutionOrderUpdateManyArgsSchema: z.ZodType<Prisma.SolutionOrderUpdateManyArgs> = z.object({
  data: z.union([ SolutionOrderUpdateManyMutationInputSchema,SolutionOrderUncheckedUpdateManyInputSchema ]),
  where: SolutionOrderWhereInputSchema.optional(),
}).strict() ;

export const SolutionOrderDeleteManyArgsSchema: z.ZodType<Prisma.SolutionOrderDeleteManyArgs> = z.object({
  where: SolutionOrderWhereInputSchema.optional(),
}).strict() ;

export const CursorCoordinatesCreateArgsSchema: z.ZodType<Prisma.CursorCoordinatesCreateArgs> = z.object({
  select: CursorCoordinatesSelectSchema.optional(),
  data: z.union([ CursorCoordinatesCreateInputSchema,CursorCoordinatesUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const CursorCoordinatesUpsertArgsSchema: z.ZodType<Prisma.CursorCoordinatesUpsertArgs> = z.object({
  select: CursorCoordinatesSelectSchema.optional(),
  where: CursorCoordinatesWhereUniqueInputSchema,
  create: z.union([ CursorCoordinatesCreateInputSchema,CursorCoordinatesUncheckedCreateInputSchema ]),
  update: z.union([ CursorCoordinatesUpdateInputSchema,CursorCoordinatesUncheckedUpdateInputSchema ]),
}).strict() ;

export const CursorCoordinatesCreateManyArgsSchema: z.ZodType<Prisma.CursorCoordinatesCreateManyArgs> = z.object({
  data: z.union([ CursorCoordinatesCreateManyInputSchema,CursorCoordinatesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CursorCoordinatesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CursorCoordinatesCreateManyAndReturnArgs> = z.object({
  data: z.union([ CursorCoordinatesCreateManyInputSchema,CursorCoordinatesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CursorCoordinatesDeleteArgsSchema: z.ZodType<Prisma.CursorCoordinatesDeleteArgs> = z.object({
  select: CursorCoordinatesSelectSchema.optional(),
  where: CursorCoordinatesWhereUniqueInputSchema,
}).strict() ;

export const CursorCoordinatesUpdateArgsSchema: z.ZodType<Prisma.CursorCoordinatesUpdateArgs> = z.object({
  select: CursorCoordinatesSelectSchema.optional(),
  data: z.union([ CursorCoordinatesUpdateInputSchema,CursorCoordinatesUncheckedUpdateInputSchema ]),
  where: CursorCoordinatesWhereUniqueInputSchema,
}).strict() ;

export const CursorCoordinatesUpdateManyArgsSchema: z.ZodType<Prisma.CursorCoordinatesUpdateManyArgs> = z.object({
  data: z.union([ CursorCoordinatesUpdateManyMutationInputSchema,CursorCoordinatesUncheckedUpdateManyInputSchema ]),
  where: CursorCoordinatesWhereInputSchema.optional(),
}).strict() ;

export const CursorCoordinatesDeleteManyArgsSchema: z.ZodType<Prisma.CursorCoordinatesDeleteManyArgs> = z.object({
  where: CursorCoordinatesWhereInputSchema.optional(),
=======
>>>>>>> db88402deb905129aba1ff77c82a6fc8bf1d027c
}).strict() ;