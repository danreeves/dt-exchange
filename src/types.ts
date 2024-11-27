export interface User {
	AccessToken: string
	RefreshToken: string
	ExpiresIn: number
	Sub: string
	AccountName: string
	RefreshAt: number
}

export interface Summary {
	_links: Links
	username: string
	name: string
	discriminator: string
	allowRename: boolean
	characters: Character[]
	email: Email
	linkedAccounts: LinkedAccounts
	marketingPreferences: MarketingPreferences
}

interface Links {
	self: Self
}

interface Self {
	href: string
}

export interface Character {
	id: string
	name: string
	gender: string
	archetype: ClassType
	specialization: string
	level: number
}

interface Email {
	address: string
	verified: boolean
}

interface LinkedAccounts {
	steam: string
	twitch: string
}

interface MarketingPreferences {
	newsletterSubscribe: boolean
	optIn: boolean
	termsAgreed: boolean
}

export interface Store {
	catalog: Catalog
	name: string
	public: any[]
	personal: Personal[]
	rerollsThisRotation: number
	currentRotationEnd: string
}

export interface Catalog {
	id: string
	name: string
	generation: number
	layoutRef: string
	validFrom: string
	validTo: string
}

export interface Personal {
	offerId: string
	sku: Sku
	entitlement: Entitlement
	price: Price
	state: "active" | "completed"
	description: Description
	media: any[]
}

export interface Description {
	id: string
	gearId: string
	rotation: string
	type: "gadget" | "weapons"
	properties: Properties
	overrides: Overrides
}

export interface Overrides {
	ver: number
	rarity: 1 | 2 | 3 | 4 | 5
	characterLevel: number
	itemLevel: number
	baseItemLevel: number
	traits: Trait[]
	perks: Perk[]
	base_stats?: BaseStat[]
	filter_match?: number // index of the first rule that the item matched to
}

export interface BaseStat {
	name: string
	value: number
}

export interface Perk {
	id: string
	rarity: number
}

export interface Trait {
	id: string
	rarity: 1 | 2 | 3 | 4 | 5
	value?: number
}

export interface Properties {}

export interface Entitlement {
	id: string
	limit: number
	type: string
}

export interface Price {
	amount: Amount
	id: string
	priority: number
	priceFormula: string
}

export interface Amount {
	amount: number
	type: string
}

export interface Sku {
	id: string
	displayPriority: number
	internalName: string
	name: string
	description: string
	category: string
	assetId: string
	tags: any[]
	dlcReq: any[]
}

type ItemType =
	| "BODY_TATTOO"
	| "CHARACTER_INSIGNIA"
	| "DEVICE"
	| "EMOTE"
	| "END_OF_ROUND"
	| "EYE_COLOR"
	| "FACE"
	| "FACE_HAIR"
	| "FACE_SCAR"
	| "FACE_TATTOO"
	| "GADGET"
	| "GEAR_EXTRA_COSMETIC"
	| "GEAR_HEAD"
	| "GEAR_LOWERBODY"
	| "GEAR_UPPERBODY"
	| "HAIR"
	| "HAIR_COLOR"
	| "LUGGABLE"
	| "MATERIAL_OVERRIDES"
	| "PERK"
	| "POCKETABLE"
	| "PORTRAIT_FRAME"
	| "SET"
	| "SKIN_COLOR"
	| "TRAIT"
	| "WEAPON_MELEE"
	| "WEAPON_RANGED"
	| "WEAPON_SKIN"
	| "WEAPON_TRINKET"

export interface Items {
	[id: string]: {
		description: string
		display_name: string
		dev_name: string
		dev_description: string
		description_values: {
			rarity: string
			string_key: string
			string_value: string
		}[]
		icon: string
		item_type: ItemType
		slots: string[]
	}
}

export interface MasterData {
	playerItems: PlayerItems
}

interface PlayerItems {
	href: string
	version: string
}

export const CLASS_TYPES = ["veteran", "zealot", "psyker", "ogryn"] as const
export type ClassType = (typeof CLASS_TYPES)[number]
export const CLASS_OPTIONS = Object.values(CLASS_TYPES) as ClassType[]

export const STORE_TYPES = ["credits", "marks"] as const
export type StoreType = (typeof STORE_TYPES)[number]
export const STORE_OPTIONS = Object.values(STORE_TYPES) as StoreType[]
export const STORE_LABELS: Record<StoreType, string> = {
	credits: "Armoury Exchange",
	marks: "Melk's Requisitorium",
}

export const ITEM_CATEGORIES = ["ranged", "melee", "curio"] as const
export type ItemCategory = (typeof ITEM_CATEGORIES)[number]
export const ITEM_OPTIONS = Object.values(ITEM_CATEGORIES) as ItemCategory[]

export interface FilterRule {
	character?: ClassType[] | ClassType
	item?: string[] | string
	type?: ItemCategory
	blessing?: string[] | string
	perk?: string[] | string
	store?: StoreType[] | StoreType
	minBlessingRarity?: number
	minPerkRarity?: number
	minStats?: number
	minRating?: number
	color?: string
	stats?: StatRule[]
}

export interface StatRule {
	name: string
	min: number
}

export interface FormFilterRule {
	character: string
	item: string
	type: string
	blessing: string
	perk: string
	store: string
	minBlessingRarity: string
	minPerkRarity: string
	minStats: string
	minRating: string
	color: string
	stats?: StatRule[]
	isOpen: boolean
}

export const SIZE = ["small", "medium", "large"] as const
export type Size = (typeof SIZE)[number]

export const defaultEmphasisColor: string = "#FF0000"
