'use client';

import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';
import { projectStore } from '@/src/global/projectStore';

const ProjectOverview = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const { projectData } = projectStore();
  const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true,
  });

  const data = {
    name: 'Emmanuel',
    age: 24,
    year: '1st Year',
  };

  // ======= handle request -->
  const call = async () => {
    setLoading(true);
    await openai.chat.completions
      .create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Give me 10 question in list format about cars`,
          },
        ],
        temperature: 0,
        max_tokens: 2048,
      })
      .then((res) => {
        console.log(res);
        setResponse(res.choices[0].message.content);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   console.log(JSON.stringify(projectData.parsed.data));
  // }, [projectData]);

  return (
    <div>
      <div>
        <textarea className='mr-3' />
        <input
          type='text'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Text goes here...'
          className='rounded-md shadow-md form__input text-base'
        />
      </div>
      <button
        className='mt-4 rounded-md shadow bg-violet-main text-white-off py-1 px-4'
        onClick={call}
      >
        Request
      </button>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {response.split('?').map((text, idx) => (
              <li key={idx}>{text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectOverview;
