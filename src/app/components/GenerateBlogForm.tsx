"use client";

import { useState } from "react";

export default function Home() {
  const [formValues, setFormValues] = useState({
    topic: "",
    keywords: "",
    tone: "",
    minwordcount: "",
    maxwordcount: "",
    structure: "",
    audience: "",
    related: "",
  });

  function handleChange(event: any) {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  }

  async function onSubmit(event: any) {
    event.preventDefault();

    let formData = {
      topic: formValues.topic,
      keywords: formValues.keywords,
      tone: formValues.tone,
      minwordcount: formValues.minwordcount,
      maxwordcount: formValues.maxwordcount,
      structure: formValues.structure,
      audience: formValues.audience,
      related: formValues.related,
    };

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      let content = data.content;
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <main>
        <div className='max-w-2xl mx-auto px-4 py-8'>
          <h2 className='text-3xl font-bold mb-8'>Blog Post Generator</h2>
          <form id='blogPostForm' onSubmit={onSubmit}>
            <div className='mb-4'>
              <label htmlFor='topic' className='block font-medium mb-1'>
                Topic:
              </label>
              <input
                type='text'
                id='topic'
                name='topic'
                className='w-full p-2 border border-gray-300 rounded'
                onChange={handleChange}
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='tone' className='block font-medium mb-1'>
                Tone or Writing Style:
              </label>
              <select
                id='tone'
                name='tone'
                className='w-full p-2 border border-gray-300 rounded'
                onChange={handleChange}
              >
                <option value=''>Select tone</option>
                <option value='Formal'>Formal</option>
                <option value='Informal'>Informal</option>
                <option value='Technical'>Technical</option>
              </select>
            </div>

            <div className='mb-4'>
              <label htmlFor='keywords' className='block font-medium mb-1'>
                Keywords:
              </label>
              <input
                type='text'
                id='keywords'
                name='keywords'
                className='w-full p-2 border border-gray-300 rounded'
                onChange={handleChange}
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='minwordcount' className='block font-medium mb-1'>
                Minimum Word Count:
              </label>
              <input
                type='number'
                id='minwordcount'
                name='minwordcount'
                placeholder='Minimum'
                className='w-full p-2 border border-gray-300 rounded'
                onChange={handleChange}
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='maxwordcount' className='block font-medium mb-1'>
                Maximum Word Count:
              </label>
              <input
                type='number'
                id='maxwordcount'
                name='maxwordcount'
                placeholder='Maximum'
                className='w-full p-2 border border-gray-300 rounded'
                onChange={handleChange}
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='structure' className='block font-medium mb-1'>
                Structure:
              </label>
              <textarea
                id='structure'
                name='structure'
                className='w-full p-2 border border-gray-300 rounded h-32'
                onChange={handleChange}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label htmlFor='audience' className='block font-medium mb-1'>
                Target Audience:
              </label>
              <input
                type='text'
                id='audience'
                name='audience'
                className='w-full p-2 border border-gray-300 rounded'
                onChange={handleChange}
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='related' className='block font-medium mb-1'>
                Related Topics:
              </label>
              <input
                type='text'
                id='related'
                name='related'
                className='w-full p-2 border border-gray-300 rounded'
                onChange={handleChange}
              />
            </div>

            <button
              type='submit'
              className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded'
            >
              Generate
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
