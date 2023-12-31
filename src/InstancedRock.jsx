/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.5 test2.glb
*/

import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'

export function InstancedRock(props) {
  const { nodes, materials } = useGLTF('/models/test2.glb')
  const ref = useRef()

  return (
    <group {...props} dispose={null}>
      {/* <mesh geometry={nodes.Icosphere.geometry} material={nodes.Icosphere.material} scale={1.435} /> */}
      <instancedMesh ref={ref} args={[null, null, 1]} geometry={nodes.Icosphere.geometry} scale={1.435}>
        <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.5} />
      </instancedMesh>
    </group>
  )
}

useGLTF.preload('/test2.glb')
