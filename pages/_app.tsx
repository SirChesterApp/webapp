import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../styles/globals.css';

import { CssBaseline, GeistProvider } from '@geist-ui/react';
import type { AppProps } from 'next/app';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
	return (
		<GeistProvider>
			<CssBaseline />

			<Component {...pageProps} />
		</GeistProvider>
	);
}

export default MyApp;
