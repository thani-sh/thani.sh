import type { InferSelectModel } from 'drizzle-orm';
import type { postTable } from '../server/db/post.schema';

// Export types used when fetching the full post item
export type Post = InferSelectModel<typeof postTable>;

// Export types used when fetching a list of posts
export type PostItem = Pick<Post, 'id' | 'slug' | 'heading' | 'summary' | 'created_at'>;

// Export types used when creating a new post
export type NewPost = Pick<Post, 'slug' | 'tags' | 'heading' | 'summary' | 'content'>;
