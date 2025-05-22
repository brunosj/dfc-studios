import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the revalidation token from the request headers
    const token = request.headers.get('x-revalidate-token');

    // Verify the token matches the environment variable
    if (token !== process.env.REVALIDATE_TOKEN) {
      console.error('Invalid revalidation token');
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Get the path and tag from the request body
    const body = await request.json();
    const { path, tag, paths, tags } = body;

    if (!path && !tag && !paths && !tags) {
      console.error('Missing path or tag in revalidation request');
      return NextResponse.json(
        { message: 'Path or tag is required' },
        { status: 400 }
      );
    }

    console.log(`Revalidation triggered at ${new Date().toISOString()}`);

    // Revalidate the path if provided
    if (path) {
      console.log(`Revalidating path: ${path}`);
      revalidatePath(path);
    }

    // Revalidate multiple paths if provided
    if (paths && Array.isArray(paths)) {
      paths.forEach((p) => {
        console.log(`Revalidating path: ${p}`);
        try {
          revalidatePath(p);
        } catch (error) {
          console.error(`Error revalidating path ${p}:`, error);
        }
      });
    }

    // Revalidate the tag if provided
    if (tag) {
      console.log(`Revalidating tag: ${tag}`);
      try {
        revalidateTag(tag);
      } catch (error) {
        console.error(`Error revalidating tag ${tag}:`, error);
      }

      // Special handling for homepage
      if (tag === 'homepage') {
        console.log(
          'Homepage tag detected - revalidating homepage-specific data'
        );
        try {
          revalidateTag('homepage-list');
          revalidatePath('/');
        } catch (error) {
          console.error('Error revalidating homepage tags:', error);
        }
      }
    }

    // Revalidate multiple tags if provided
    if (tags && Array.isArray(tags)) {
      tags.forEach((t) => {
        console.log(`Revalidating tag: ${t}`);
        try {
          revalidateTag(t);
        } catch (error) {
          console.error(`Error revalidating tag ${t}:`, error);
        }

        // Special handling for homepage
        if (t === 'homepage') {
          console.log(
            'Homepage tag detected - revalidating homepage-specific data'
          );
          try {
            revalidateTag('homepage-list');
            revalidatePath('/');
          } catch (error) {
            console.error('Error revalidating homepage tags:', error);
          }
        }
      });
    }

    // Always revalidate the root path
    try {
      console.log('Revalidating root path');
      revalidatePath('/');
    } catch (error) {
      console.error('Error revalidating root path:', error);
    }

    return NextResponse.json(
      {
        revalidated: true,
        now: Date.now(),
        path: path || null,
        paths: paths || null,
        tag: tag || null,
        tags: tags || null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}
