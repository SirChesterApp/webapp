import { Loading } from '@geist-ui/react';
import React, { useEffect, useState } from 'react';
import { MosaicBranch, MosaicWindow } from 'react-mosaic-component';

import { getSearchEngine, getTileName, Tile, TileState } from '../util';

export interface TileProps {
	id: number;
	/**
	 * The `?q=` query parameter, representing the user search string.
	 */
	q: string;
	path: MosaicBranch[];
	tileState: TileState;
}

export function Tile({
	id,
	path,
	q,
	tileState,
}: TileProps): React.ReactElement {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 500);
	});

	return (
		<MosaicWindow<number>
			className="no-toolbar"
			draggable={false}
			path={path}
			title={getTileName(tileState.tiles[id])}
		>
			{loading && <Loading />}
			<iframe
				className={`full-width full-height ${loading ? 'hide' : ''}`}
				onLoad={() => setLoading(false)}
				src={getIframeUrl(tileState.tiles[id], q)}
			/>
		</MosaicWindow>
	);
}

/**
 * Get the URL to show in an iframe.
 */
function getIframeUrl(tile: Tile, query: string): string {
	const se = getSearchEngine(tile);
	const url = se.searchString?.replaceAll('%s', query);

	if (!url) {
		throw new Error('url is empty in getIframeUrl');
	}

	if (!process.env.NEXT_PUBLIC_PROXY_URL) {
		throw new Error('url is empty in getIframeUrl');
	}

	if (se.proxy) {
		return `${
			process.env.NEXT_PUBLIC_PROXY_URL
		}/?__sirchester_target=${encodeURIComponent(url)}`;
	}

	return url;
}
