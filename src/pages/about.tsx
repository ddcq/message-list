import React, { ReactElement } from 'react';
import { Link, Text, TextContainer } from 'react-md';

export default function Contact(): ReactElement {
	return (
		<TextContainer>
			<Text type="headline-5">Me Contacter</Text>
			<hr />
			<Text type="headline-6">Mail</Text>
			<p>declercq.denis@free.fr</p>
			<Text type="headline-6">Around the word</Text>
			<ul>
				<li>
					<Link href="http://ca.linkedin.com/in/denis-declercq-bb6b298">LinkedIn</Link>
				</li>
				<li>
					<Link href="http://www.viadeo.com/p/0021epf6mkaedrhk">Viadeo</Link>
				</li>
				<li>
					<Link href="http://plus.google.com/u/0/+DenisDECLERCQ">Google+</Link>
				</li>
			</ul>
			<Text type="headline-6">CV à télécharger</Text>
			<ul>
				<li>
					<Link href="https://ddcq.github.io/resume/CV - Denis Declercq.docx" className="btn-social">
						Word
					</Link>
				</li>
				<li>
					<Link href="https://ddcq.github.io/resume/CV - Denis Declercq - light.docx" className="btn-social">
						Word (version light)
					</Link>
				</li>
			</ul>
			Copyright © Denis Declercq 2020
		</TextContainer>
	);
}
